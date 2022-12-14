from locale import currency
from operator import eq
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_
from flask_cors import CORS
import json
import datetime
import time
from os import environ
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import urllib.request
import json


app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["2000 per day", "500 per hour"]
)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3306/ESD5'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost/companies'

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/companies'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

CORS(app)


class Equity(db.Model):
    __tablename__ = 'companies'
    ticker = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=True)
    total = db.Column(db.Float, nullable=True)
    env = db.Column(db.Float, nullable=True)
    soc = db.Column(db.Float, nullable=True)
    gov = db.Column(db.Float, nullable=True)
    industry = db.Column(db.String(120), nullable=True)


    def __init__(self, ticker, name):

        print("test")
        self.ticker = ticker
        self.name = name

        price = self.getPrice(ticker)

        if(price != None): 
            self.price = price

        valueDict = self.getEsg_and_esgIndustry(ticker)

        if(valueDict != None):
            self.total = valueDict['total']
            self.env = valueDict['env']
            self.soc = valueDict['soc']
            self.gov = valueDict['gov']
            self.industry = valueDict["industry"]

    def json(self):
        return {"ticker": self.ticker, "name": self.name, "price": self.price, "industry": self.industry, "total": self.total, "env": self.env, "soc": self.soc, "gov": self.gov, "industry": self.industry}

            

def getPrice(ticker):
        try: 
            url = "https://query2.finance.yahoo.com/v10/finance/quoteSummary/" + ticker + "?modules=summaryDetail"
            connection = urllib.request.urlopen(url)

            data = connection.read()
            data_2 = json.loads(data)
            price = data_2["quoteSummary"]["result"][0]["summaryDetail"]["previousClose"]["fmt"]

        except:
            print(ticker + "'s pricing cannot be found in yahoo")
            return None
        
        return price

        
def getEsg_and_esgIndustry(ticker):
    try: 
        url = "https://query2.finance.yahoo.com/v1/finance/esgChart?symbol=" + ticker
        connection = urllib.request.urlopen(url)
        data = connection.read()
        data_2 = json.loads(data)
        
        industry = data_2["esgChart"]["result"][0]["peerGroup"]

        Formatdata = data_2["esgChart"]["result"][0]["symbolSeries"]
        total = Formatdata['esgScore'][-1]
        env = Formatdata['environmentScore'][-1]
        gov = Formatdata['governanceScore'][-1] 
        soc = Formatdata['socialScore'][-1] 

    except:
        print(ticker + "'s ESG values cannot be found in yahoo")
        return None


    return {"total": total, "env": env, "gov": gov, "soc": soc, "industry": industry}   


def loopList(tickerList):

    result = {}
    # resultList = []
    for ticker in tickerList:
        price = getPrice(ticker)
        valueDict = getEsg_and_esgIndustry(ticker)

        if(price != None and valueDict != None): 
            total = valueDict['total']
            env = valueDict['env']
            soc = valueDict['soc']
            gov = valueDict['gov']
            industry = valueDict["industry"]


            # result.append(ticker)

            # resultList.append(ticker)

            result[ticker] = {"price": price, "total": total, "env": env, "gov": gov, "soc": soc, "industry": industry}  

    return result

        
    
@app.route("/equity", methods=['GET'])
def getAll():

        equityList = Equity.query.all()

        if (equityList):
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "equity": [equity.json() for equity in equityList]
                    }
                }
            )

        return jsonify(
            {
                "code": 404,
                "message": "equities not found."
            }
        ), 404

@app.route("/dataSourceUpdate", methods=["GET"])
def retrieveFromYahoo():
    tickerList = retrieveTickers()
    values = loopList(tickerList)

    try:
        for ticker in values:
            equity = Equity.query.filter_by(ticker=ticker).first()
            if equity: 
                print(values[ticker]["price"])
                equity.price = values[ticker]["price"]
                equity.env = values[ticker]["env"]
                equity.total = values[ticker]["total"]
                equity.soc = values[ticker]["soc"]
                equity.gov = values[ticker]["gov"]
                # equity.industry = values[ticker]["industry"]
                db.session.commit()

    except:
        pass
        #     return jsonify(
        # {
        #     "code": 404,
            
        #     "message": "There was an error."
        # }
        # ), 404

    return jsonify(
        {
            "code": 200,
            "data":  {
                "message": "successfully updated"
            }
        }
        ), 200




# @app.route("/retrieveTickers", methods=["GET"])
def retrieveTickers():
    tickerList = []   
    tickerList = Equity.query.with_entities(Equity.ticker)

    print("******************")
    print(tickerList)
    output = []
    for ticker in tickerList:
        print(ticker)
        output.append(ticker[0])
    print(output)

    print("******************")

    return output

    # if (output):
    #     return jsonify(
    #         {
    #             "code": 200,
    #             "data": {
    #                 "tickerList": output
    #             }
    #         }
    #     )

    # return jsonify(
    #     {
    #         "code": 404,
    #         "message": "tickerList not found."
    #     }
    # ), 404

    


@app.route("/indexedEquity", methods=['GET'])
def getAll3():

    indexedEquity = {}

    equityList = Equity.query.all()

    for equity in equityList:
        # print(equity)
        # equity = json.dumps(equity)
        equityDict = json.loads(json.dumps(equity.json()))

        # print(equityDict)
        ticker = equityDict['ticker']
        indexedEquity[ticker] = equityDict
    


    if (equityList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "equity": indexedEquity
                }
            }
        )

    return jsonify(
        {
            "code": 404,
            "message": "equities not found."
        }
    ), 404

    # User.username == currentuser).email

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5006, debug=True)

