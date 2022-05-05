import os
import psycopg2
import psycopg2.errors as e
from psycopg2.errorcodes import *

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


    def getStockBySymbol(self, symbol):
        cursor = self.conn.cursor()
        query = "select stockid, symbol from stock where symbol = %s;"
        cursor.execute(query, (symbol,))
        stock = cursor.fetchone()
        return stock


    def createStock(self, symbol):
        cursor = self.conn.cursor()
        query = "insert into stock(symbol) values (%s) returning stockid;"
        cursor.execute(query, (symbol,))
        stockId = cursor.fetchone()[0]
        self.conn.commit()
        return stockId


    def saveUserStock(self, userid, stockid):
        try:
            cursor = self.conn.cursor()
            query = "insert into monitors(userid, stockid) values (%s, %s);"
            cursor.execute(query, (userid, stockid))
            self.conn.commit()
            return True
        except (e.lookup(UNIQUE_VIOLATION), e.lookup(FOREIGN_KEY_VIOLATION)):
            return False


    def removeUserStock(self, userid, stockid):
        cursor = self.conn.cursor()
        query = "delete from monitors where userid=%s and stockid=%s;"
        cursor.execute(query, (userid, stockid))
        self.conn.commit()
        removed_rows = cursor.rowcount
        return removed_rows != 0



