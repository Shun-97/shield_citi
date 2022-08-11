from result import OilAndGas, Biotechnology


store = {}                                                                                                                         
with open('/Users/brayden/Desktop/shield_citi/backend/misc/obtainCompanyNames.txt', 'r') as f: 
    for line in f:
        if line.endswith('\n'):
            key, name, industry = line.split('\t')
            # print(key + ' * ' + name + " * " + industry)

            if "Biotechnology" in industry:
                store[key] = {"name": name, "industry": "BioTechnology"}
            elif "Major Integrated" in industry:
                store[key] = {"name": name, "industry": "OilAndGas"}

for equity in Biotechnology:
    industry = store[equity]["industry"]
    name = store[equity]["name"]

    print((equity, name, industry, null, null', 'null', 'null', 'null'))





# d = dict()
# for strip in strip_list: 
#     print(strip)
#     d[strip[0]] = strip[1]


# print(d)

# def tupGenerator(equityList):
#     for equity in equityList:
#         e
