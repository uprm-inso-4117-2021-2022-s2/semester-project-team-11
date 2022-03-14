import re
from flask import jsonify
from model.users import UsersDAO

class BaseUsers:

#####################################################################################################
#                                          VALIDATORS                                               #
#####################################################################################################
 
    # This function will validate the format of the email
    @staticmethod
    def validateEmailFormat(email: str) -> bool:
        emailRegex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
        return True if re.fullmatch(emailRegex, email)  else False


    # This function will validate the format of the password, should contain:
    #   At least one uppercase letter
    #   At least one lowercase letter
    #   At least one digit 
    #   At least one special charater between: $, !, ?, or _
    #   Must be between 8-25 characters long
    @staticmethod
    def validatePassword( password: str) -> bool:
        passwordRegex = re.compile(r'(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!?_])[A-Za-z\d$!?_]{8,25}')
        return True if re.fullmatch(passwordRegex, password) else False


    # This function will verify that the name is at Least one character long and does not contains 
    # numbers or special characters
    @staticmethod
    def validateName(name: str) -> bool:
        nameRegex = re.compile(r'[A-Za-z]+')
        return True if re.fullmatch(nameRegex, name) else False


#####################################################################################################
#                                       JSON FORMATTERS                                             #
#####################################################################################################

    def build_login_map_dict(self, row):
        result = {}
        result['userid'] = row[0]
        result['firstname'] = row[1]
        result['lastname'] = row[2]
        return result
    
    def build_newuser_map_dict(self, row):
        result = {}
        result['userid'] = row[0]
        result['firstname'] = row[1]
        result['lastname'] = row[2]
        result['email'] = row[3]
        result['legalAge'] = row[4]
        return result

#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################
    def userLogin(self, json):
        email = json["email"]
        password = json["password"]

        dao = UsersDAO()
        user = dao.userLogin(email, password)
        dao.conn.close()

        if user:
            result = self.build_login_map_dict(user)
            return jsonify(result), 200
        else:
            return jsonify("USER AUTHENTICATION FAILED"), 401

    def createNewUser(self, json):
        firstname = json["firstname"]
        lastname = json["lastname"]
        email = json["email"]
        password = json["password"]
        legalAge = json["legalAge"]

        if not BaseUsers.validateEmailFormat(email):
            return jsonify("INVALID EMAIL FORMAT"), 400

        if not BaseUsers.validatePassword(password):
            return jsonify("INVALID PASSWORD FORMAT"), 400
        
        if not (BaseUsers.validateName(firstname) and BaseUsers.validateName(lastname)):
            return jsonify("INVALID NAME FORMAT"), 400

        dao = UsersDAO()
        if dao.isEmailAlreadyInUse(email):
            dao.conn.close()
            return jsonify("EMAIL IS ALREADY IN USE"), 400

        userID = dao.createUser(firstname, lastname, email, password, legalAge)
        dao.conn.close()

        if userID:
            user_tuple = (userID, firstname, lastname, email, legalAge)
            result = self.build_newuser_map_dict(user_tuple)
            return jsonify(result), 201
        else:
            return jsonify("USER NOT CREATED"), 500

