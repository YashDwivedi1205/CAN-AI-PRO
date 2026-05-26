import yfinance as yf

def check_yahoo():
    ticker = "RELIANCE.NS"
    print(f"🔍 Testing Yahoo Finance for {ticker}...")
    try:
        stock = yf.Ticker(ticker)
        # Price check
        price = stock.fast_info['lastPrice']
        print(f"✅ Connection Success! Current Price: {price}")
        
        # Financials check (Jo 'A' layer ke liye chahiye)
        income = stock.financials
        if not income.empty:
            print("✅ Financial Data received successfully!")
        else:
            print("⚠️ Connection okay, but Financials are empty.")
            
    except Exception as e:
        print(f"❌ Connection Failed! Error: {e}")

if __name__ == "__main__":
    check_yahoo()