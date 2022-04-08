from flask import jsonify
from model.stock import StockDAO

class BaseStock:
#####################################################################################################
#                                       JSON FORMATTERS                                             #
#####################################################################################################
    def build_saved_stocks_dict(self, row):
        result = {}
        result['symbol'] = row[0]
        return result
   
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################
    def getUserSavedStocks(self, userid):
        dao = StockDAO()
        stocks = dao.getUserSavedStocks(userid)
        dao.conn.close()
        result = []
        for stock in stocks:
            result.append(self.build_saved_stocks_dict(stock))
        return jsonify(result), 200