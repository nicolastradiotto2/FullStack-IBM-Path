from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

# Connessione al container 'db' (MongoDB) sulla porta 27017
client = MongoClient("mongodb://db:27017/")
db = client["test_db"]

@app.route('/')
def home():
    count = db.visits.count_documents({})
    db.visits.insert_one({"visit": count + 1})
    return f"Visita numero: {count + 1}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
