from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# 🔹 Lista fittizia (simula un piccolo "database" in memoria)
items = [
    {"id": 1, "name": "Item A"},
    {"id": 2, "name": "Item B"}
]

# 🔹 Rotta principale
@app.route('/')
def home():
    return render_template('index.html', nome="Nicola")

# 🔹 Rotta GET → restituisce tutti gli item
@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items)

# 🔹 Rotta POST → aggiunge un item
@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()   # riceve il JSON dal client
    new_item = {"id": len(items) + 1, "name": data["name"]}
    items.append(new_item)
    return jsonify(new_item), 201

# 🔹 Rotta DELETE → elimina un item per id
@app.route('/api/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    global items
    items = [item for item in items if item["id"] != item_id]
    return jsonify({"message": f"Item {item_id} eliminato con successo"})

if __name__ == '__main__':
    app.run(debug=True)
