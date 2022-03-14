import os
import psycopg2
from config.dbconfig import pg_config

class UsersDAO:
    def __init__(self):
        self.conn = psycopg2.connect(os.environ["DATABASE_URL"], sslmode="require")

#####################################################################################################
#                                       HELPER METHODS                                              #
#####################################################################################################

    def isEmailAlreadyInUse(self, email):
        cursor = self.conn.cursor()
        query = "select email from users where email = %s;"
        cursor.execute(query, (email,))
        count = cursor.rowcount
        return False if (count == 0) else True

    
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################

    def createUser(self, firstname: str, lastname: str, email: str, password: str, legalAge: bool):
        cursor = self.conn.cursor()
        query = "insert into users(firstname, lastname, email, password, legalAge) values (%s, %s, %s , crypt(%s, gen_salt('bf')), %s) returning userid;"
        cursor.execute(query, (firstname, lastname, email, password, legalAge))
        userID = cursor.fetchone()[0]
        self.conn.commit()
        self.conn.close()
        return userID


    