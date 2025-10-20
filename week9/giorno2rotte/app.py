from flask import Flask, render_template

app = Flask(__name__)

# 🔹 Rotta principale
@app.route('/')
def home():
    # Passiamo una variabile all'HTML
    return render_template('index.html', nome="Nicola")

# 🔹 Rotta dinamica
@app.route('/user/<name>')
def user(name):
    # <name> arriva dall'URL e viene passato alla pagina HTML
    return render_template('index.html', nome=name)

if __name__ == '__main__':
    app.run(debug=True)
