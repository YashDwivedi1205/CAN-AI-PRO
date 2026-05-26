import pandas as pd
import requests
from io import StringIO

def fetch_quarterly_filing(ticker):
    """
    Screener.in Shareholding Scraper - Sirf FII/DII/Promoter Data ke liye
    """
    # Ticker cleaning for Screener (e.g., RELIANCE.NS -> RELIANCE)
    clean_ticker = ticker.split('.')[0].upper().replace("_", "")
    url = f"https://www.screener.in/company/{clean_ticker}/"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            # Seedha 'Promoters' wali table uthao
            tables = pd.read_html(StringIO(response.text), match="Promoters")
            if not tables:
                return {"promoter": 0, "fii": 0, "dii": 0, "public": 0, "trend": []}
            
            df = tables[0]
            latest_col = df.columns[-1]

            def clean_val(val):
                try:
                    if isinstance(val, str):
                        val = val.replace('%', '').strip()
                        return float(val) if val and val != '-' else 0.0
                    return float(val)
                except: return 0.0

            # Last 4 Quarters ka Trend nikalna
            trend_data = []
            cols = df.columns[1:][-4:] # Last 4 quarters columns
            
            for c in cols:
                try:
                    fii_row = df[df.iloc[:,0].str.contains('FIIs', na=False, case=False)]
                    dii_row = df[df.iloc[:,0].str.contains('DIIs', na=False, case=False)]
                    
                    fii_val = clean_val(fii_row[c].values[0]) if not fii_row.empty else 0.0
                    dii_val = clean_val(dii_row[c].values[0]) if not dii_row.empty else 0.0
                    
                    trend_data.append({
                        "quarter": str(c), 
                        "fii": fii_val, 
                        "dii": dii_val
                    })
                except: continue

            # Final Summary Data
            return {
                "promoter": clean_val(df[df.iloc[:,0].str.contains('Promoters', na=False, case=False)][latest_col].values[0]),
                "fii": clean_val(df[df.iloc[:,0].str.contains('FIIs', na=False, case=False)][latest_col].values[0]),
                "dii": clean_val(df[df.iloc[:,0].str.contains('DIIs', na=False, case=False)][latest_col].values[0]),
                "public": clean_val(df[df.iloc[:,0].str.contains('Public', na=False, case=False)][latest_col].values[0]),
                "trend": trend_data
            }
    except Exception as e:
        print(f"❌ Shareholding Scraper Error: {e}")
        
    return {"promoter": 0, "fii": 0, "dii": 0, "public": 0, "trend": []}

def fetch_bulk_deals_direct(ticker):
    """Placeholder function to avoid breaking app.py imports"""
    return []