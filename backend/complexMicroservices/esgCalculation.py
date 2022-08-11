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
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost/backEnd'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# service classes to use
CUSTOMER_URL = "http://localhost:5003/"
EQUITY_URL = "http://localhost:5006/"
ESG_PROFILING_URL = "http://localhost:5004/"



@app.route("/getExistingCustomerValues", methods=['POST'])
def getExistingIndustries():
        if request.is_json:
            # try:
            data = request.get_json()
            cid = data['cid']

            result = processExistingIndustries(cid)
            return jsonify(
                {
                    "code": 200,
                    "data": {
                        "equity": result
                    }
                }
            ), 200

def processExistingIndustries(cid):
    response1 = invoke_http(CUSTOMER_URL + "/CustomerPortfolio/"+str(cid), method='GET')
    positionList = response1['data']

    response2 = invoke_http(method='GET', url=EQUITY_URL + "indexedEquity")
    equityJson = response2['data']['equity']
    # print("*****")
    # print(type(equityJson))

    output = []
    
    for position in positionList:
        position = json.dumps(position)
        positionDict = json.loads(position)
        ticker = positionDict['ticker']

        equity = equityJson[ticker]
        equity = json.dumps(equity)
        print(equity)
        equityDict = json.loads(equity)

        output.append(equityDict["industry"])
    
    return list(set(output))

@app.route("/scoring", methods=['POST'])
def scoring():
    if request.is_json:
        # try:
        data = request.get_json()
        cid = data['cid']
        print("\nReceived customer ID in JSON:", cid)
        result = processScoring(cid)
        return jsonify(
            {
                "code": 200,
                "data": {
                    "equity": result
                }
            }
        ), 200

def processScoring(cid):
    response1 = invoke_http(ESG_PROFILING_URL + "EsgScore/"+str(cid), method='GET')
    env = response1['data']['env']
    soc = response1['data']['soc']
    gov = response1['data']['gov']

    response2 = invoke_http(method='GET', url=EQUITY_URL + "indexedEquity")
    equityJson = response2['data']['equity']
    print("*****")
    print(type(equityJson))



    response3 = invoke_http(method='GET', url= CUSTOMER_URL+ "CustomerPortfolio/"+ str(cid))
    positionList = response3['data']

    tabulationDict = {}
    totalValue = 0

    for position in positionList:
        position = json.dumps(position)
        positionDict = json.loads(position)
        ticker = positionDict['ticker']

        equity = equityJson[ticker]
        equity = json.dumps(equity)
        equityDict = json.loads(equity)

        valueOfPosition = positionDict["qty"] * equityDict["price"]
        profileEnvScore = (env) * equityDict['env'] / 100 * 3
        profileSocScore = (soc) * equityDict['soc'] / 100 * 3
        profileGovScore = (gov) * equityDict['gov'] / 100 * 3

        totalValue += valueOfPosition
        tabulationDict[ticker] = {"env": profileEnvScore, "soc": profileSocScore, "gov": profileGovScore, "valueOfPosition": valueOfPosition}
    
    print(tabulationDict)
    outputEnv = 0
    outputSoc = 0
    outputGov = 0

    for position in tabulationDict:
        outputEnv += tabulationDict[ticker]["env"] * ((tabulationDict[ticker]["valueOfPosition"])/totalValue)
        outputSoc += tabulationDict[ticker]["soc"] * ((tabulationDict[ticker]["valueOfPosition"])/totalValue) 
        outputGov += tabulationDict[ticker]["gov"] * ((tabulationDict[ticker]["valueOfPosition"])/totalValue) 

    
    total = outputEnv+outputGov+outputSoc
    
    return {    "env": round(outputEnv, 2),
                "soc": round(outputSoc, 2),
                "gov": round(outputGov, 2),
                "total": total
            }

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
        # print(equity)
        equity = json.dumps(equity)
        equityDict = json.loads(equity)
        equityDict['profileScore'] = round(((env/100) * equityDict['env'] + (soc/100) * equityDict['soc'] + (gov/100) * equityDict['gov']) * 3, 2) 
        result.append(equityDict)
    
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5198, debug=True)