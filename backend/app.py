from flask import Flask, request, jsonify
from flask_cors import CORS
from controller.users import BaseUsers
from controller.stock import BaseStock
from controller.news import BaseNews

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def hello_world(): 
    return 'Stocker by Team 11 @ UPRM - 2022'

#####################################################################
#                               USERS                               #
#####################################################################

@app.route('/stocker/users/login', methods=["POST"])
def handle_login():
    if request.method == 'POST':
        return BaseUsers().userLogin(request.json)
    else:
        return jsonify("METHOD NOT ALLOWED"), 405


@app.route('/stocker/users', methods=["POST"])
def handle_users():
    if request.method == 'POST':
        return BaseUsers().createNewUser(request.json)
    else:
        return jsonify("METHOD NOT ALLOWED"), 405


#####################################################################
#                               STOCK                               #
#####################################################################

@app.route('/stocker/stock/savedStocks/<int:userid>', methods=["GET", "POST", "DELETE"])
def handle_user_stocks(userid):
    if request.method == 'GET':
        return BaseStock().getUserSavedStocks(userid)
    elif request.method == 'POST':
        return BaseStock().saveUserStock(request.json, userid)
    elif request.method == 'DELETE':
        return BaseStock().removeUserStock(request.json, userid)
    else:
        return jsonify("METHOD NOT ALLOWED"), 405

#####################################################################
#                                NEWS                               #
#####################################################################

@app.route('/stocker/news/savedNews/<int:userid>', methods=["GET"])
def handle_user_news(userid):
    if request.method == 'GET':
         return BaseNews().getUserSavedNews(userid)
    else:
        return jsonify("METHOD NOT ALLOWED"), 405

if __name__ == '__main__':
    app.run(debug=True)
  