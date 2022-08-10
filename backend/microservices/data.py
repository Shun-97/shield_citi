from datetime import datetime as dt
import urllib.request
import json


class Data:

    def __init__(self, ticker):
        self.ticker = ticker
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

        # getEsg_and_esgIndustry(self, ticker)


    def json(self):
            return {"ticker": self.ticker, "price": self.price, "total": self.total, "env":self.env, "soc":self.soc, "gov": self.gov, }

    
    def getPrice(self, ticker):
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

    
    def getEsg_and_esgIndustry(self, ticker):
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



#test case
def obtain_companies(ticketList):
        companyList = []
        # companyDict = {}

        for ticker in ticketList:
            created = Data(ticker)
            companyList.append(str(created.json()))

        return companyList



# print("errors: ")
varuList1 = ['AAPL', 'BAC', 'AMZN', 'T', 'MO', 'DAL', 'AA', 'AXP', 'DD', 'BABA', 'ABT', 'UA', 'AMAT', 'AMGN', 'AAL', 'AIG', 'ALL', 'ADBE', 'GOOGL', 'ACN', 'ABBV', 'MT', 'LLY', 'AGN', 'APA', 'ADP', 'APC', 'AKAM', 'NLY', 'ABX', 'ATVI', 'ADSK', 'ADM', 'BMH.AX', 'WBA', 'ARNA', 'LUV', 'ACAD', 'PANW', 'AMD', 'AET', 'AEP', 'ALXN', 'AVGO', 'EA', 'DB', 'AEM', 'APD', 'AMBA', 'NVS', 'ANF', 'LULU', 'RAD', 'BRK.AX', 'ARRY', 'AGNC', 'JBLU', 'A', 'ORLY', 'FOLD', 'AZO', 'AN', 'AZN', 'AES', 'BUD', 'ARR', 'BDX', 'AKS', 'AB', 'ACOR', 'CS', 'AFL', 'ADI', 'ACIW', 'AMP', 'AVP', 'AMTD', 'AEO', 'AWK', 'NVO', 'ALK', 'PAA', 'AAP', 'NAT', 'FNMA', 'AIV', 'AGIO', 'AEE', 'UBS', 'AVXL', 'ARLP', 'ANTM', 'AGU', 'AG', 'AFSI', 'ABC', 'STO', 'ATI', 'AVB', 'ATW', 'ALNY', 'LH', 'AVY', 'AUY', 'ASH']
# print(len(foundList))
noIssues = ['AAPL', 'BAC', 'AMZN', 'T', 'MO', 'DAL', 'AA', 'AXP', 'DD', 'BABA', 'ABT', 'AMAT', 'AMGN', 'AAL', 'AIG', 'ALL', 'ADBE', 'GOOGL', 'ACN', 'ABBV', 'LLY', 'APA', 'ADP', 'AKAM', 'NLY', 'ATVI', 'ADSK', 'ADM', 'WBA', 'LUV', 'PANW', 'AEP', 'AVGO', 'EA', 'DB', 'AEM', 'APD', 'LULU', 'RAD', 'AGNC', 'A', 'ORLY', 'AZO', 'AES', 'ARR', 'BDX', 'AFL', 'ADI', 'AMP', 'AMTD', 'AWK', 'AAP', 'FNMA', 'AIV', 'AEE', 'UBS', 'ANTM', 'ABC', 'AVB', 'LH', 'AVY', 'ASH']
testList = ['AAPL', "GOOGL"]

print(obtain_companies(noIssues))

