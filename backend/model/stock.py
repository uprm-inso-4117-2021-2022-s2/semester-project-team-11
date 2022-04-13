import os
from matplotlib.style import use
import psycopg2

class StockDAO:

    def __init__(self):
        self.conn = psycopg2.connect(os.environ["DATABASE_URL"], sslmode="require")

   
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################

    def getUserSavedStocks(self, userid):
        cursor = self.conn.cursor()
        query = "select symbol from monitors natural inner join stock where userid = %s;"
        cursor.execute(query, (userid,))
        stocks = []
        for row in cursor:
            stocks.append(row)
        self.conn.close()
        return stocks