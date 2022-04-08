import os
from matplotlib.style import use
import psycopg2
from config.dbconfig import pg_config

class StockDAO:

    def __init__(self):
        # self.conn = psycopg2.connect(os.environ["DATABASE_URL"], sslmode="require")
       
        self.conn = psycopg2.connect(pg_config['uri'])

   
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################

    def getUserSavedStocks(self, userid):
        cursor = self.conn.cursor()
        query = "select symbol from  monitors as M ,  \
            stock as S where M.userid = %s and s.stockid = M.stockid;"
        cursor.execute(query, (userid,))
        stocks = []
        for row in cursor:
            stocks.append(row)
        self.conn.close()
        return stocks