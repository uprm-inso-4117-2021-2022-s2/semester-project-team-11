from flask import jsonify
from model.stock import StockDAO

class BaseStock:
#####################################################################################################
#                                       JSON FORMATTERS                                             #
#####################################################################################################
    def build_saved_stocks_dict(self, row):
        result = {}
        result['symbol'] = row
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


    def saveUserStock(self, json, userid):
        symbol = json['symbol']
        dao = StockDAO()
        stock = dao.getStockBySymbol(symbol)

        if stock:
            stockid = stock[0]
        else:
            stockid = dao.createStock(symbol)

        saved = dao.saveUserStock(userid, stockid)
        dao.conn.close()

        if saved:
            return jsonify("STOCK WAS SAVED SUCCESSFULLY."), 201
        else:
            return jsonify("EITHER STOCK WAS ALREADY SAVED OR USER DOESN'T EXIST."), 500


    def removeUserStock(self, json, userid):
        symbol = json['symbol']
        dao = StockDAO()
        stock = dao.getStockBySymbol(symbol)
        if not stock:
            return jsonify("STOCK SYMBOL NOT FOUND."), 500

        removed = dao.removeUserStock(userid, stock[0])
        dao.conn.close()
        if removed:
            return jsonify("USER STOCK WAS REMOVED SUCCESSFULLY."), 201
        else:
            return jsonify("USER DIDN'T HAVE THE STOCK SAVED."), 500
