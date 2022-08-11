import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import requests
from os import environ
from invokes import invoke_http
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


app = Flask(__name__)
CORS(app, supports_credentials=True)
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') or 'mysql+mysqlconnector://root@localhost:3306/ESD5'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/backEnd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# service classes to use
CUSTOMER_URL = "http://localhost:5003/"
EQUITY_URL = "http://localhost:5006/"
ESG_PROFILING_URL = "http://localhost:5004/"

@app.route("/recommendations", methods=['POST'])
def recommendations():


    if request.is_json:
        # try:
        data = request.get_json()
        cid = data['cid']
        print("\nReceived customer ID in JSON:", cid)
        result = processRecommendation(cid)
        return jsonify(
            {
                "code": 200,
                "data": {
                    "equity": result
                }
            }
        ), 200

def processRecommendation(cid):

    response1 = invoke_http(ESG_PROFILING_URL + "EsgScore/"+str(cid), method='GET')
    env = response1['data']['env']
    soc = response1['data']['soc']
    gov = response1['data']['gov']


    response2 = invoke_http(method='GET', url=EQUITY_URL + "equity")
    equityList = response2['data']['equity']
    result = []

    for equity in equityList:
        print(equity)
        equity = json.dumps(equity)
        equityDict = json.loads(equity)
        print(env)
        print(equityDict['env'])
        equityDict['profileScore'] = round(((env/100) * equityDict['env'] + (soc/100) * equityDict['soc'] + (gov/100) * equityDict['gov']) * 3, 2) 
        result.append(equityDict)
    
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5198, debug=True)