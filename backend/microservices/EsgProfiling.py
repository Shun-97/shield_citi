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
import math

app = Flask(__name__)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["2000 per day", "500 per hour"]
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/CUST_ESG_SCORE'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)

class CustEsgScore(db.Model):
    __tablename__ = "CUST_ESG_SCORE"
    cid = db.Column(db.Integer, primary_key=True)
    env = db.Column(db.Float(precision=2), nullable=False)
    soc = db.Column(db.Float(precision=2), nullable=False)
    gov = db.Column(db.Float(precision=2), nullable=False)

    def __init__(self, cid, env, soc, gov):
        self.cid = cid
        self.env = env
        self.soc = soc
        self.gov = gov
    
    def json(self):
        return{"cid" : self.cid, "env" : self.env, "soc" : self.soc, "gov" : self.gov}

@app.route("/calculateEsgScore", methods=["POST", "GET"])
def calculate_Esg_Score():

    env_score = 0
    soc_score = 0
    gov_score = 0

    try:
        data = request.get_json()

        for a_data in data:
            if a_data["Info"][0] == "E":
                env_score += a_data["Info"][1]
            if a_data["Info"][0] == "S":
                soc_score += a_data["Info"][1]
            if a_data["Info"][0] == "G":
                gov_score += a_data["Info"][1]
        
        env_percentage = (env_score / (env_score + soc_score + gov_score)) * 100
        soc_percentage = (soc_score / (env_score + soc_score + gov_score)) * 100
        gov_percentage = 100 - (env_percentage + soc_percentage)

        if env_percentage + soc_percentage + gov_percentage > 100:
            gov_percentage = math.floor(gov_percentage)
        else:
            gov_percentage = math.ceil(gov_percentage)

        if(env_percentage and soc_percentage and gov_percentage):

            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "env score" : math.floor(env_percentage),
                        "soc score" : math.ceil(soc_percentage),
                        "gov_score" : gov_percentage
                    },
                    "message": "Risk Appetite Score is tabulated"
                }
            ), 200

    except Exception as e:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "env score" : env_percentage,
                    "soc score" : soc_percentage,
                    "gov_score" : gov_percentage
                },
                "message": "ESG scores are not tabulated due to:  " + str(e)
            }
        ), 500

if __name__ == '__main__':
    app.run(port=5004, debug=True)
