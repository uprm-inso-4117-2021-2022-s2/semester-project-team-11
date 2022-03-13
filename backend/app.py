from flask import Flask, request, jsonify
from flask_cors import CORS
from controller.users import BaseUsers

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world(): 
    return 'Stocker by Team 11 @ UPRM - 2022'

#####################################################################
#                               USERS                               #
#####################################################################

@app.route('/stocker/users', methods=["POST"])
def handle_users():
    if request.method == 'POST':
        return BaseUsers().createNewUser(request.json)
    else:
        return jsonify("METHOD NOT ALLOWED"), 405

if __name__ == '__main__':
    app.run(debug=True)
  