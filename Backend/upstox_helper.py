# import os
# import requests

# class UpstoxHelper:
#     def __init__(self):
#         self.access_token = os.getenv('UPSTOX_ACCESS_TOKEN')
#         self.base_url = "https://api.upstox.com/v2"
#         self.headers = {
#             'Authorization': f'Bearer {self.access_token}',
#             'Accept': 'application/json'
#         }

#     def get_market_quote(self, ticker):
#         """
#         Fetches real-time quote for a single ticker.
#         """
#         try:
#             # Format cleaning: Upstox needs NSE_EQ|SYMBOL
#             clean_ticker = ticker.replace(".NS", "").upper().replace("-", "_")
#             instrument_key = f"NSE_EQ|{clean_ticker}"
            
#             url = f"{self.base_url}/market-quote/quotes?instrument_key={instrument_key}"
#             print(f"📡 Upstox Single Request: {instrument_key}")
            
#             response = requests.get(url, headers=self.headers, timeout=5)
            
#             if response.status_code == 200:
#                 res_data = response.json()
#                 # Return the specific instrument data
#                 return res_data.get('data', {}).get(instrument_key, {})
#             else:
#                 print(f"❌ Upstox API Error {response.status_code} for {instrument_key}")
#                 return {}
#         except Exception as e:
#             print(f"❌ Helper Error for {ticker}: {e}")
#             return {}

#     def get_historical_avg_vol(self, ticker):
#         """
#         Placeholder for historical volume logic.
#         """
#         return 100000










import os
import requests
from datetime import datetime, timedelta

class UpstoxHelper:
    def __init__(self):
        self.access_token = os.getenv('UPSTOX_ACCESS_TOKEN')
        self.base_url = "https://api.upstox.com/v2"
        self.headers = {
            'Authorization': f'Bearer {self.access_token}',
            'Accept': 'application/json'
        }

    def get_market_quote(self, ticker):
        """
        Fetches real-time quote for a single ticker.
        """
        try:
            # Format cleaning: Upstox needs NSE_EQ|SYMBOL
            clean_ticker = ticker.replace(".NS", "").upper().replace("-", "_")
            instrument_key = f"NSE_EQ|{clean_ticker}"
            
            url = f"{self.base_url}/market-quote/quotes?instrument_key={instrument_key}"
            print(f"📡 Upstox Single Request: {instrument_key}")
            
            response = requests.get(url, headers=self.headers, timeout=5)
            
            if response.status_code == 200:
                res_data = response.json()
                # Return the specific instrument data
                return res_data.get('data', {}).get(instrument_key, {})
            else:
                print(f"❌ Upstox API Error {response.status_code} for {instrument_key}")
                return {}
        except Exception as e:
            print(f"❌ Helper Error for {ticker}: {e}")
            return {}

    def get_full_quote(self, instrument_key):
        """
        Directly fetches quote using the instrument key (Required by app.py)
        """
        try:
            url = f"{self.base_url}/market-quote/quotes?instrument_key={instrument_key}"
            response = requests.get(url, headers=self.headers, timeout=5)
            if response.status_code == 200:
                return response.json().get('data', {}).get(instrument_key, {})
            return {}
        except Exception as e:
            print(f"❌ Error in get_full_quote: {e}")
            return {}

    def get_historical_avg_vol(self, ticker):
        """
        Fetches historical data to calculate average volume (Last 30 days).
        """
        try:
            clean_ticker = ticker.replace(".NS", "").upper().replace("-", "_")
            instrument_key = f"NSE_EQ|{clean_ticker}"
            
            to_date = datetime.now().strftime('%Y-%m-%d')
            from_date = (datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')
            
            url = f"{self.base_url}/historical-candle/{instrument_key}/day/{to_date}/{from_date}"
            response = requests.get(url, headers=self.headers, timeout=5)
            
            if response.status_code == 200:
                candles = response.json().get('data', {}).get('candles', [])
                if not candles:
                    return 100000 # Default fallback
                
                # Upstox candle format: [timestamp, open, high, low, close, volume, open_interest]
                total_vol = sum(c[5] for c in candles)
                avg_vol = total_vol / len(candles)
                return round(avg_vol, 0)
            return 100000
        except Exception as e:
            print(f"❌ Historical Vol Error: {e}")
            return 100000