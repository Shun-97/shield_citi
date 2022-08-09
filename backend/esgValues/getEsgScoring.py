import pandas as pd
from datetime import datetime as dt
import urllib.request
import json


def getDict(ticketList):
    esgDict = {}
    for ticker in ticketList:
        getEsg(ticker, esgDict)
    return esgDict


def getEsg(ticker, esgDict):

    try: 
        url = "https://query2.finance.yahoo.com/v1/finance/esgChart?symbol=" + ticker

        connection = urllib.request.urlopen(url)

        data = connection.read()
        data_2 = json.loads(data)
        Formatdata = data_2["esgChart"]["result"][0]["symbolSeries"]


        total = Formatdata['esgScore'][-1]
        env = Formatdata['environmentScore'][-1]
        gov = Formatdata['governanceScore'][-1] 
        soc = Formatdata['socialScore'][-1] 

        esgDict[ticker] = {"total": total, "env": env, "gov": gov, "soc": soc}
    except:
        print(ticker + " cannot be found in yahoo")

print("errors: ")
varuList1 = ['AAPL', 'BAC', 'AMZN', 'T', 'GOOG', 'MO', 'DAL', 'AA', 'AXP', 'DD', 'BABA', 'ABT', 'UA', 'AMAT', 'AMGN', 'AAL', 'AIG', 'ALL', 'ADBE', 'GOOGL', 'ACN', 'ABBV', 'MT', 'LLY', 'AGN', 'APA', 'ADP', 'APC', 'AKAM', 'NLY', 'ABX', 'ATVI', 'ADSK', 'ADM', 'BMH.AX', 'WBA', 'ARNA', 'LUV', 'ACAD', 'PANW', 'AMD', 'AET', 'AEP', 'ALXN', 'AVGO', 'EA', 'DB', 'AEM', 'APD', 'AMBA', 'NVS', 'ANF', 'LULU', 'RAD', 'BRK.AX', 'ARRY', 'AGNC', 'JBLU', 'A', 'ORLY', 'FOLD', 'AZO', 'AN', 'AZN', 'AES', 'BUD', 'ARR', 'BDX', 'AKS', 'AB', 'ACOR', 'CS', 'AFL', 'ADI', 'ACIW', 'AMP', 'AVP', 'AMTD', 'AEO', 'AWK', 'NVO', 'ALK', 'PAA', 'AAP', 'NAT', 'FNMA', 'AIV', 'AGIO', 'AEE', 'UBS', 'AVXL', 'ARLP', 'ANTM', 'AGU', 'AG', 'AFSI', 'ABC', 'STO', 'ATI', 'AVB', 'ATW', 'ALNY', 'LH', 'AVY', 'AUY', 'ASH']

print(getDict(varuList1))


