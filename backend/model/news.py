import os
import psycopg2

class NewsDAO:

    def __init__(self):
        self.conn = psycopg2.connect(os.environ["DATABASE_URL"],sslmode="require" )
       
   
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################

    def getUserSavedNews(self, userid):
        cursor = self.conn.cursor()
        query = "select title, link, uuid from interested natural inner join news where userid = %s;"
        cursor.execute(query,(userid,))
        news = []
        for row in cursor:
            news.append(row)
        self.conn.close()
        return news