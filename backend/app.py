from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world():  # put application's code here
    return 'Stocker'

if __name__ == '__main__':
    app.run(debug=True)