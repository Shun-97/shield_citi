from unittest import result
import urllib.request
import json

def getListFromTxtFile(filename): 
    with open(filename, 'r') as f:
        tickerList = [line.strip() for line in f]
        return tickerList

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

    # result = {}
    resultList = []
    for ticker in tickerList:
        price = getPrice(ticker)
        valueDict = getEsg_and_esgIndustry(ticker)

        if(price != None and valueDict != None): 
            total = valueDict['total']
            env = valueDict['env']
            soc = valueDict['soc']
            gov = valueDict['gov']
            industry = valueDict["industry"]

            # print(ticker)
            # print(total)
            # print(env)

            # result.append(ticker)

            resultList.append(ticker)

            # result[ticker] = {"price": price, "total": total, "env": env, "gov": gov, "soc": soc, "industry": industry}  

    return resultList

# change txt file
myNames = getListFromTxtFile('/Users/brayden/Desktop/shield_citi/backend/misc/food.txt')        
print(loopList(myNames))


# {'total': 24.32, 'env': 1.66, 'gov': 11.54, 'soc': 11.12, 'industry': 'Software & Services', 'GOOGL': {'price': '116.63', 'total': 24.32, 'env': 1.66, 'gov': 11.54, 'soc': 11.12, 'industry': 'Software & Services'}}