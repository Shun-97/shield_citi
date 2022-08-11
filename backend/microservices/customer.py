from locale import currency
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
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/NEW_CUST_KYC'
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

@app.route("/customer")
def get_all():
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
    return jsonify(
        {
            "code": 404,
            "message": "There are no customers."
        }
    ), 404

if __name__ == '__main__':
    app.run(port=5003, debug=True)