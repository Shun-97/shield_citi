from locale import currency
from unicodedata import name
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_
from flask_cors import CORS
import json
import datetime
import time
from os import environ

import sqlalchemy
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
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost/CUSTOMER'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)

class NewCustKyc(db.Model):
    __tablename__ = 'NEW_CUST_KYC'
    cid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    risk_Appetite = db.Column(db.Integer, nullable=False)

    def __init__(self, cid, name, risk_Appetite):
        self.cid = cid
        self.name = name
        self.risk_Appetite = risk_Appetite

    def json(self):
        return {"cid":self.cid, "name":self.name, "risk_Appetite":self.risk_Appetite}

class ExistingCustPortfolio(db.Model):
    __tablename__ = 'EXISTING_CUST_PORTFOLIO'
    cid = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(120), primary_key=True)
    qty = db.Column(db.Integer, nullable = False)

    def __init__(self, cid, ticker, qty):
        self.cid = cid
        self.ticker = ticker
        self.qty = qty
    
    def json(self):
        return {"cid" : self.cid, "ticker" : self.ticker, "qty" : self.qty }


class NewCustIndustryPreferred(db.Model):
    __tablename__ = "NEW_CUST_PREFERRED_INDUSTRY"
    cid = db.Column(db.Integer, nullable = False)
    preferred_industry = db.Column(db.String(120), primary_key=True)

    def __init__(self, cid, preferred_industry):
        self.cid = cid
        self.preferred_industry = preferred_industry
    
    def json(self):
        return {"cid" : self.cid, "preferred_industry" : self.preferred_industry}

# get custimer by customer id


@app.route("/calculateRiskAppetite", methods=['POST', 'GET'])
def calculate_Risk_Appetite():

    risk_appetite_score = 0
    try:
        data = request.get_json()
        for i in range(0,len(data)-1):
            risk_appetite_score += (data[i]["Selected"]/data[i]["Max"])
        risk_appetite_percentage = (risk_appetite_score / (len(data)-1)) * 100
        
        

        if(risk_appetite_score):
            

            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "riskAppetiteScore" : risk_appetite_percentage
                    },
                    "message": "Risk Appetite Score is tabulated"
                }
            ), 200

    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "riskAppetiteScore" : risk_appetite_percentage
                },
                "message": "Risk appetite score is not tabulated due to:  " + str(e)
            }
        ), 500

@app.route("/addCustomerPortfolio/<int:cid>/<string:ticker>/<int:qty>", methods=['POST'])
def add_customer_portfolio_by_cid(cid, ticker, qty):
    if(ExistingCustPortfolio.query.filter_by(cid=cid) and ExistingCustPortfolio.query.filter_by(ticker=ticker).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "cid": cid,
                    "ticker" : ticker,
                    "qty" : qty
                },
                "message": "Customer Portfolio already exists."
            }
        ), 400
    
    data = request.get_json()
    custPortfolio = ExistingCustPortfolio(cid, ticker, qty)

    try:
        db.session.add(custPortfolio)
        db.session.commit()
    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "cid": cid,
                    "ticker" : ticker
                },
                "message": "An error occurred creating the Customer Portfolio. Error is " + str(e)
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": custPortfolio.json()
        }
    ), 201


@app.route("/CustomerPortfolio/<int:cid>")
def get_customer_portfolio_by_cid(cid):

    try:
        customerPortfolio = ExistingCustPortfolio.query.filter_by(cid=cid)
        result = []
        for a_portfolio in customerPortfolio:
            print(a_portfolio)
            if a_portfolio:
                result.append(a_portfolio)
        return jsonify(
            {
                "code": 200,
                "data": [portfolio.json() for portfolio in result]
            }
    )

    except:
        return jsonify(
            {
                "code": 404,
                "message": "ESG Score for CID: " + str(cid) + " is not found."
            }
    ), 404

@app.route("/customer")
def get_all_customer():
    try:
        customerList = NewCustKyc.query.all()
        if len(customerList):
            return jsonify(
                {
                "code": 200,
                "data": {
                    "customer": [customer.json() for customer in customerList]
                    }
                }
            )
    except:
        return jsonify(
            {
                "code": 404,
                "message": "There are no customers."
            }
        ), 404

@app.route("/customer/<int:cid>")
def get_customer_by_cid(cid):
    try:
        customerList = NewCustKyc.query.filter_by(cid=cid).first()
        
        if customerList:
            return jsonify(
                {
                    "code": 200,
                    "data": customerList.json()
                }
        )

    except:
        return jsonify(
            {
                "code": 404,
                "message": "Customer with CID " + str(cid) + " is not found."
            }
    ), 404


@app.route("/custIndustryPreferred")
def get_all_preference():
    try:
        preference_list = NewCustIndustryPreferred.query.all()
        if len(preference_list):
            return jsonify(
                {
                "code": 200,
                "data": {
                    "customer": [preference.json() for preference in preference_list]
                    }
                }
            )
    except:
        return jsonify(
            {
                "code": 404,
                "message": "There are no customer preference."
            }
        ), 404

@app.route("/addCustIndustryPreference/<int:cid>/<string:preferred_industry>", methods = ["POST"])
def add_preferences(cid, preferred_industry):

    if(NewCustIndustryPreferred.query.filter_by(cid=cid)and NewCustIndustryPreferred.query.filter_by(preferred_industry=preferred_industry).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "cid": cid,
                    "preferred_industry" : preferred_industry,
                },
                "message": "Customer Preferred Industry already exists."
            }
        ), 400
    
    data = request.get_json()
    custPreferredIndustry = NewCustIndustryPreferred(cid, preferred_industry)

    try:
        db.session.add(custPreferredIndustry)
        db.session.commit()

    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "cid": cid,
                    "preferred_industry" : preferred_industry,
                },
                "message": "An error occurred creating the Customer Preferred Industry. Error is " + str(e)
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": custPreferredIndustry.json()
        }
    ), 201
    






if __name__ == '__main__':
    app.run(port=5003, debug=True)

# FE write JSON file and display the qn

# need receive some json request from FE (need check the request from FE side) and add up the score and update the DB and send 200 OK if everything is good if not 500 or smth. 

# json file receive from joel (array of objects) --> add up according to E,S,G (3 qn each max score 9 for each pillar) --> calculate percentage for E and S and to get G score, minus E and S from 100. If total is lesser than 100, round up G if total is more than 100 round down G.

# risk appetite just send the final score 