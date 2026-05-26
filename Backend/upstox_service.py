import requests
import os
from dotenv import load_dotenv

load_dotenv()

class UpstoxService:
    def __init__(self, token):
        self.token = token
        self.base_url = "https://api.upstox.com/v2"
        self.headers = {
            'Authorization': f'Bearer {self.token}',
            'Accept': 'application/json'
        }

    def get_market_quote(self, symbol):
        """Upstox se Live Price aur Volume lane ke liye"""
        # Upstox ko NSE:RELIANCE format chahiye hota hai
        instrument_key = f"NSE_EQ|INE002A01018" # Ye hume mapping se nikalna hoga, par abhi simple rakhte hain
        # Asli tareeka symbol search ka:
        url = f"{self.base_url}/market-quote/quotes?instrument_key=NSE_EQ|{symbol}"
        
        try:
            response = requests.get(url, headers=self.headers)
            data = response.json()
            if data['status'] == 'success':
                quote = list(data['data'].values())[0]
                return {
                    "last_price": quote['last_price'],
                    "volume": quote['volume'],
                    "average_price": quote['average_price'],
                    "cp": quote['close'] # Previous close
                }
            return None
        except Exception as e:
            print(f"Upstox Quote Error: {e}")
            return None

    def get_historical_data(self, symbol, interval='day'):
        """Charts ke liye data"""
        url = f"{self.base_url}/historical-candle/NSE_EQ|{symbol}/{interval}/2026-02-07/2025-01-01"
        # ... logic for charts ...
        pass