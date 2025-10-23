from flask import Flask, jsonify, request, render_template
import os
from dotenv import load_dotenv
from google import genai

# 🔹 Carica chiave API da file .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)

app = Flask(__name__)

# 🔹 Lista temporanea
items = [
    {"id": 1, "name": "Item A"},
    {"id": 2, "name": "Item B"}
]

@app.route('/')
def home():
    return render_template('index.html', nome="Nicola")

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = {"id": len(items) + 1, "name": data["name"]}
    items.append(new_item)
    return jsonify(new_item), 201

@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [i for i in items if i["id"] != item_id]
    return jsonify({"message": f"Item {item_id} eliminato con successo"})

@app.route('/api/sentiment', methods=['POST'])
def sentiment():
    data = request.get_json()
    testo = data.get("testo", "")

    prompt = (
        "Analizza il seguente testo e dimmi se il sentimento è positivo, "
        "negativo o neutro. Rispondi solo con UNA parola (positivo/negativo/neutro).\n\n"
        f"Testo: {testo}"
    )

    try:
        resp = client.models.generate_content(
            model="gemini-2.0-flash",   
            contents=prompt
        )
        valutazione = (resp.text or "").strip().lower()
        if valutazione not in {"positivo", "negativo", "neutro"}:
            valutazione = "neutro"

        print(f"Testo: {testo} → Sentiment: {valutazione}")
        return jsonify({"testo_inserito": testo, "sentiment": valutazione})
    except Exception as e:
        return jsonify({"errore": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
