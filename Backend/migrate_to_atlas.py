# import pymongo
# from pymongo import MongoClient
# import sys

# # --- CONFIGURATION ---
# # 1. Aapka local MongoDB (Aksar yahi hota hai)
# LOCAL_MONGO_URI = "mongodb://localhost:27017/"

# # 2. ⚠️ APNI ATLAS LINK YAHAN PASTE KAREIN (Username aur Password ke sath)
# # Example: "mongodb+srv://shubham:password123@cluster0.abcde.mongodb.net/"
# ATLAS_MONGO_URI = "mongodb+srv://CAN_AI_User:pCFwmOM8kGFngiex@cluster0.jnaiqtg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# DB_NAME = "stock_analysis_db"

# def start_migration():
#     try:
#         print("Connecting to databases...")
#         local_client = MongoClient(LOCAL_MONGO_URI, serverSelectionTimeoutMS=5000)
#         atlas_client = MongoClient(ATLAS_MONGO_URI, serverSelectionTimeoutMS=5000)
        
#         # Test connections
#         local_client.admin.command('ping')
#         atlas_client.admin.command('ping')
#         print("✅ Connected to both Local and Atlas!")

#         local_db = local_client[DB_NAME]
#         atlas_db = atlas_client[DB_NAME]

#         # Saari collections ki list nikalna
#         collections = local_db.list_collection_names()
#         print(f"Found {len(collections)} collections to migrate: {collections}")

#         for coll_name in collections:
#             print(f"\nMoving collection: [{coll_name}]...")
            
#             # Local se data nikalna
#             data = list(local_db[coll_name].find())
            
#             if data:
#                 print(f"--- Found {len(data)} documents. Uploading to Atlas...")
#                 # Atlas par purana data clear karna (taaki duplicate na ho)
#                 atlas_db[coll_name].delete_many({})
#                 # Naya data insert karna
#                 atlas_db[coll_name].insert_many(data)
#                 print(f"--- ✅ {coll_name} migrated successfully!")
#             else:
#                 print(f"--- ℹ️ {coll_name} is empty, skipping.")

#         print("\n" + "="*30)
#         print("🔥 ALL DONE! Saara data Atlas par hai.")
#         print("="*30)

#     except Exception as e:
#         print(f"\n❌ FATAL ERROR: {e}")
#         print("Check if your Local MongoDB is running and Atlas IP Whitelist is set to 0.0.0.0/0")

# if __name__ == "__main__":
#     start_migration()







import openai
client_debug = openai.OpenAI(api_key=os.getenv("XAI_API_KEY"), base_url="https://api.x.ai/v1")
models = client_debug.models.list()
for m in models.data:
    print(f"Available Model: {m.id}")





# import os
# from pymongo import MongoClient

# # LOCAL: Compass mein jo dikh raha hai wahi naam use karo
# local_client = MongoClient("mongodb://localhost:27017")
# local_db = local_client['stock_analysis_db'] # Yahi naam use karo

# # ATLAS: Cloud connection
# atlas_client = MongoClient("mongodb+srv://AIFSA_User:CANSLIMAI123@cluster0.qeqczeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# atlas_db = atlas_client['stock_analysis_db'] # Cloud par bhi yahi database banega

# # Collections list - jo tumhare Compass mein dikh rahe hain
# collections = ['stocks', 'stocks_cache', 'institutional_cache', 'canslim_results', 'config']

# for coll_name in collections:
#     print(f"Transferring {coll_name}...")
#     data = list(local_db[coll_name].find({}))
#     if data:
#         atlas_db[coll_name].insert_many(data)
#         print(f"✅ {coll_name} done!")
#     else:
#         print(f"⚠️ {coll_name} khali hai ya nahi mila!")

# print("Migration complete!")



# from pymongo import MongoClient
# client = MongoClient("mongodb+srv://AIFSA_User:CANSLIMAI123@cluster0.qeqczeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
# db = client.stock_analysis_db
# print(db.list_collection_names())