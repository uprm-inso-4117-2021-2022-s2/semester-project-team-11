from flask import jsonify
from model.news import NewsDAO


class BaseNews:

    
#####################################################################################################
#                                       JSON FORMATTERS                                             #
#####################################################################################################
    def build_saved_news_dict(self, row):
        result = {}
        result['title'] = row[0]
        result['link'] = row[1]
        result['uuid'] = row[2]
        return result
   
  
#####################################################################################################
#                                       CRUD OPERATIONS                                             #
#####################################################################################################
 
    def getUserSavedNews(self, userid):
        dao = NewsDAO()
        news = dao.getUserSavedNews(userid)
        dao.conn.close()
        result = []
        for new in news:
            result.append(self.build_saved_news_dict(new))
        return jsonify(result), 200