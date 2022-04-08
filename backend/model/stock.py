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
    query = "select symbol from  monitors as M ,  \
        stock as S where M.userid = %s and s.stockid = M.stockid;"
    cursor.execute(query, (userid,))
    stocks = cursor.fetchone()
    self.conn.close()
    return stocks