import os
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

# Recupera i valori dal file .env (Docker li caricherà come variabili)
mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")

client = MongoClient(mongo_uri)
db = client[db_name]

@app.route('/')
def home():
    count = db.visits.count_documents({})
    db.visits.insert_one({"visit": count + 1})
    return f"Visita numero: {count + 1}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
