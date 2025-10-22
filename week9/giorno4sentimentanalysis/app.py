from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

#  Lista temporanea (come un mini database)
items = [
    {"id": 1, "name": "Item A"},
    {"id": 2, "name": "Item B"}
]

#  Rotta home
@app.route('/')
def home():
    return render_template('index.html', nome="Nicola")

#  Rotta GET – restituisce tutti gli item
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

#  Rotta POST – aggiunge un item
@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = {"id": len(items) + 1, "name": data["name"]}
    items.append(new_item)
    return jsonify(new_item), 201

#  Rotta DELETE – elimina item per id
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [i for i in items if i["id"] != item_id]
    return jsonify({"message": f"Item {item_id} eliminato con successo"})

#  Nuova API AI base – Analisi del sentiment
@app.route('/api/sentiment', methods=['POST'])
def sentiment():
    data = request.get_json()               # riceve il JSON dal client
    testo = data.get("testo", "").lower()   # prende il campo "testo" e lo mette in minuscolo

    # Logica 
    if "bravo" in testo or "bene" in testo or "ottimo" in testo:
        sentiment = "positivo "
    elif "male" in testo or "pessimo" in testo or "odio" in testo:
        sentiment = "negativo "
    else:
        sentiment = "neutro "

    # Risposta in  JSON
    return jsonify({
        "testo_inserito": testo,
        "sentiment": sentiment
    })

if __name__ == '__main__':
    app.run(debug=True)
