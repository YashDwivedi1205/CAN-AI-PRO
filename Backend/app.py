import os
import requests
import requests_cache
import json
import time
import random
import re
import threading
import openai
import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import google.generativeai as genai
from pymongo import MongoClient
from groq import Groq
from audit_logic import perform_actual_audit

load_dotenv()

tasks = {} # Global dictionary
import uuid

# ================================
# 1. CONFIGURATION & URLS
# ================================
# Render par COLAB_URL ki zaroorat nahi hai
COLAB_URL = os.getenv("COLAB_URL")

GEMINI_API_KEY = os.getenv("Gemini_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-flash')
    print("✅ Gemini API Key Loaded!")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client_groq = openai.OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# MongoDB Connection
# MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://CAN_AI_User:pCFwmOM8kGFngiex@cluster0.jnaiqtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

MONGO_URI = os.getenv("MONGO_URI") 

if not MONGO_URI:
    print("❌ ERROR: MONGO_URI environment variable is missing!")
    db = None
else:
    try:
        client = MongoClient(MONGO_URI)
        db = client['stock_analysis_db'] # Yahi database naam rakhna
        print("✅ MongoDB Atlas Connected Successfully!")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")
        db = None

try:
    client = MongoClient(MONGO_URI)
    db = client['stock_analysis_db']
    print("✅ MongoDB Atlas Connected Successfully!")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")
    db = None

app = Flask(__name__)
CORS(app) # Sirf itna kaafi hai, baaki sab hata do

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    return response

@app.before_request
def check_if_server_up():
    # Ye confirm karega ki request process ho rahi hai
    pass

# ================================
# 2. PROXY MECHANISM (GATEWAY)
# ================================

@app.route('/')
def home():
    return jsonify({"status": "Backend is running!"})

def forward_to_colab(path, method='GET', data=None, params=None):
    """Requests ko Colab backend par forward karne ke liye"""
    clean_path = path.lstrip('/')
    url = f"{COLAB_URL}/{clean_path}"
    headers = {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json"
    }
    try:
        if method == 'GET':
            resp = requests.get(url, headers=headers, params=params, timeout=45)
        else:
            resp = requests.post(url, headers=headers, json=data, timeout=45)
        
        # Check if response is valid JSON
        if "application/json" in resp.headers.get("Content-Type", ""):
            return resp.json(), resp.status_code
        else:
            return {"error": "Colab returned HTML instead of JSON. Restart Colab ngrok."}, 502
    except Exception as e:
        return {"error": f"Colab Connection Failed: {str(e)}"}, 500

# ================================
# 3. LOCAL ROUTES (Jo isi PC par chalenge)
# ================================

@app.route('/api/trending-stocks', methods=['GET'])
def get_trending_stocks_route():
    try:
        if db is not None:
            stocks = list(db.stocks_cache.find({"a_layer_active": True, "annual_eps_growth": {"$gt": 20}}).limit(12))
            if len(stocks) < 5:
                stocks = list(db.stocks_cache.find({"a_layer_active": True}).limit(12))
            
            results = []
            for s in stocks:
                results.append({
                    "ticker": s.get('ticker', 'N/A'),
                    "name": s.get('ticker', 'Unknown'),
                    "current_price": float(s.get('price', 0)),
                    "today_change_percent": random.uniform(-1.5, 4.5),
                    "volume_factor": round(s.get('current_vol', 1) / 50000, 2),
                    "price_change_5d": random.uniform(-2, 8),
                    "reason": "Institutional Accumulation" if s.get('roe', 0) > 15 else "High EPS Growth"
                })
            return jsonify({"success": True, "results": results})
        return jsonify({"success": False, "message": "Local DB error"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})

@app.route('/api/ai-analysis/<ticker>')
def ai_analysis(ticker):
    try:
        clean_ticker = ticker.upper().replace(".NS", "")
        url = f"https://news.google.com/rss/search?q={clean_ticker}+stock+news+when:1d&hl=en-IN&gl=IN&ceid=IN:en"
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        content = urlopen(req, timeout=10).read()
        soup = BeautifulSoup(content, 'xml')
        headlines = [item.title.text for item in soup.find_all('item')[:5]]
        
        prompt = f"Analyze these headlines for {ticker} and give Bullish/Bearish sentiment: {headlines}"
        response = model.generate_content(prompt)
        return jsonify({"ticker": ticker, "ai_verdict": response.text, "status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)})

# ================================
# 4. PROXY ROUTES (With Ngrok Bypass Fix)
# ================================

# 🔥 CRITICAL FIX: Frontend page.tsx calls '/api/full-audit/<ticker>' so this route must exist!

def run_heavy_ai_process(task_id, ticker):
    try:
        # Yahan apna main audit function call karo
        # Example: result = perform_actual_audit(ticker)
        result = {"data": "Audit complete for " + ticker} # Dummy result
        
        tasks_col.update_one(
            {"task_id": task_id}, 
            {"$set": {"status": "completed", "result": result}}
        )
    except Exception as e:
        tasks_col.update_one(
            {"task_id": task_id}, 
            {"$set": {"status": "failed", "error": str(e)}}
        )
        
@app.route('/api/scan-nifty-s', methods=['GET'])
def scan_s_proxy():
    data, code = forward_to_colab('api/scan-volume') 
    return jsonify(data), code

@app.route('/api/institutional-deep-check/<symbol>', methods=['GET'])
def institutional_check_proxy(symbol):
    data, code = forward_to_colab(f'api/institutional-analysis/{symbol}')
    return jsonify(data), code

@app.route('/api/sector-leaders/<sector>', methods=['GET'])
def sector_leaders_proxy(sector):
    data, code = forward_to_colab(f'api/get-leaders', params={"sector": sector})
    return jsonify(data), code

@app.route('/api/get-single-news/<ticker>', methods=['GET'])
def proxy_single_news(ticker):
    data, code = forward_to_colab(f'api/full-analysis/{ticker}')
    if code == 200:
        return jsonify({
            "details": data.get("latest_news", []),
            "summary": data.get("reason_summary", "No summary available.")
        }), 200
    return jsonify(data), code

@app.route('/api/bulk-canslim', methods=['GET'])
def proxy_bulk_canslim():
    data, code = forward_to_colab('api/bulk-canslim')
    return jsonify(data), code
    
@app.route('/api/canslim-detail', methods=['GET'])
def proxy_canslim_detail():
    symbol = request.args.get('symbol')
    data, code = forward_to_colab('api/canslim-detail', params={"symbol": symbol})
    return jsonify(data), code
    
@app.route('/api/market-direction')
def market_direction_proxy():
    data, code = forward_to_colab('api/market-direction')
    return jsonify(data), code

@app.route('/api/chat', methods=['POST'])
def chat_proxy():
    # 1. Pehle check karo kya Colab URL set hai
    if COLAB_URL:
        # Colab try karo
        data, code = forward_to_colab('api/chat', method='POST', data=request.json)
        # Agar Colab se error aaye (500/502), toh niche wala fallback chale
        if code == 200:
            return jsonify(data), code

    # 2. FALLBACK: Agar Colab fail ho gaya, toh Local server hi Groq call karega
    try:
        user_msg = request.json.get("message", "")
        completion = client_groq.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": user_msg}],
            timeout=30 
        )
        return jsonify({"reply": completion.choices[0].message.content})
    except Exception as e:
        return jsonify({"reply": f"Dono engines busy hain: {str(e)}"}), 500

@app.route('/api/deep-audit/<ticker>')
def deep_audit_proxy(ticker):
    data, code = forward_to_colab(f'api/deep-audit/{ticker}')
    return jsonify(data), code

@app.route('/api/scan-nifty-a')
def scan_a_proxy():
    data, code = forward_to_colab('api/scan-nifty-a')
    return jsonify(data), code

@app.route('/api/scan-nifty-n')
def scan_n_proxy():
    data, code = forward_to_colab('api/scan-nifty-n')
    return jsonify(data), code

@app.route('/api/get-7day-news/<ticker>', methods=['GET'])
def get_7day_news_proxy(ticker):
    data, code = forward_to_colab(f"api/get-7day-news/{ticker}")
    return jsonify(data), code

@app.route('/api/audit', methods=['GET'])
def get_groq_quant_audit_route(): # Route name same rakha hai taaki frontend break na ho
    try:
        ticker = request.args.get('ticker')
        if not ticker:
            return jsonify({"error": "Ticker symbol is required"}), 400

        ticker = ticker.upper().strip()

        print(f"🚀 Forwarding Pure AI 7-Level Audit to Colab Engine for: {ticker}")
        data, code = forward_to_colab(f'api/full-audit/{ticker}')
        return jsonify(data), code

    except Exception as e:
        print(f"❌ Error routing to Colab Engine: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/stock-detail/<ticker>', methods=['GET'])
def stock_detail_proxy(ticker):
    # Colab par forward karo
    data, code = forward_to_colab(f'api/stock-detail/{ticker}')
    return jsonify(data), code

# Aur agar /api/sector-leaders bina sector ke call ho raha hai, toh ye bhi add karo:
@app.route('/api/sector-leaders', methods=['GET'])
def sector_leaders_default_proxy():
    # Default 'IT' bhej do agar kuch nahi aaya
    data, code = forward_to_colab(f'api/sector-leaders/IT')
    return jsonify(data), code

@app.route('/api/full-audit/<ticker>', methods=['GET'])
def start_audit(ticker):
    task_id = str(uuid.uuid4())
    # Threading use karo taaki request turant return ho jaye
    tasks_col.insert_one({"task_id": task_id, "status": "processing"})
    threading.Thread(target=run_heavy_ai_process, args=(task_id, ticker)).start()
    return jsonify({"task_id": task_id})

@app.route('/api/audit-status/<task_id>', methods=['GET'])
def get_audit_status(task_id):
    task = tasks_col.find_one({"task_id": task_id})
    if not task:
        return jsonify({"status": "not_found"}), 404
    return jsonify({"status": task["status"], "result": task.get("result")})

# ================================
# 5. SERVER START
# ================================
# if __name__ == '__main__':
#     print(f"🚀 Gateway Server Running on ${process.env.NEXT_PUBLIC_API_URL}")
#     print(f"🔗 Forwarding missing requests to: {COLAB_URL}")
#     app.run(host='0.0.0.0', port=5001, debug=False)

if __name__ == "__main__":
    # Render PORT environment variable deta hai, use use karo
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
