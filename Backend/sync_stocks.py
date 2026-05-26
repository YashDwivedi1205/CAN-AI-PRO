import yfinance as yf
from pymongo import MongoClient
import time

# 1. MongoDB Connection Setup
# Agar aapka Compass local hai to 'localhost:27017' rahega
client = MongoClient('mongodb://localhost:27017/')
db = client['stock_audit_db']
collection = db['institutional_data']

# 2. Stocks ki list (Aap yahan apne pasand ke tickers add kar sakte hain)
tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS"]

def fetch_and_sync():
    for ticker in tickers:
        print(f"Fetching data for {ticker}...")
        try:
            stock = yf.Ticker(ticker)
            
            # Institutional Holders Data
            # yFinance gives top 10 holders in a dataframe
            holders_df = stock.institutional_holders
            
            holders_list = []
            if holders_df is not None and not holders_df.empty:
                # Sirf Top 5 Holders ke naam nikalna
                holders_list = holders_df['Holder'].head(5).tolist()
            else:
                holders_list = ["Data Not Available"]

            # Mock Trend Data (Kyunki free APIs trend history kam deti hain)
            # Hum ek basic quarterly growth logic yahan rakh sakte hain
            mock_trend = [
                {"quarter": "Q2", "funds": 1200},
                {"quarter": "Q3", "funds": 1250},
                {"quarter": "Q4", "funds": 1310}
            ]

            # 3. Data structure for MongoDB
            document = {
                "ticker": ticker.replace(".NS", ""),
                "top_holders": holders_list,
                "trends": mock_trend,
                "last_updated": time.strftime("%Y-%m-%d %H:%M:%S")
            }

            # 4. MongoDB mein Save/Update karna (Upsert logic)
            collection.update_one(
                {"ticker": document["ticker"]},
                {"$set": document},
                upsert=True
            )
            print(f"Successfully synced {ticker}")

        except Exception as e:
            print(f"Error fetching {ticker}: {e}")
        
        time.sleep(1) # API block na ho isliye delay

if __name__ == "__main__":
    fetch_and_sync()
    print("\n--- All stocks synced to MongoDB Compass! ---")