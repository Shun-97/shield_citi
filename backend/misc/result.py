from sqlalchemy import null


OilAndGas = ['SU.TO', 'BP.L', 'PETR4.SA', 'CVE.TO', 'XOM', 'CVX', 'CE2.DE', 'REP.MC', 'ENI.MI', 'XONA.DU', 'XOM.MX', 'TOT.MI', 'TOTB.DE', 'IMO', 'ROSN.L', 'IMO.TO', 'CHV.F', 'CVX.MX', 'BPE5.DU', 'CE2.F', '0386.HK', '0857.HK', 'PC6.MU','ENI.MU', 'REPSN.MX',  'GALPN.MX', 'ONGC.NS',  'TOTB.F', 'CHV.HA']
Biotechnology = ['AMGN', 'LIFE', 'CSL.AX', 'BIIB', 'BMRN', 'TECH', 'UCB.BR', 'INCY', 'JAZZ', 'CERS', 'GILD', 'SGEN', 'REGN', 'VRTX', 'ILMN', 'SPPI', 'CAPS', 'IDP.DU', 'GIS.DE', 'GILD.MX', 'VX1.MU']




Food = ['ORK.OL', 'ABF.L', 'BUFF', 'BIMBOA.MX', 'BN.PA', 'JBSS3.SA', 'KHC', 'GRUMAB.MX', 'KHC.MX', '2319.HK', '0322.HK', '0151.HK', 'GRM.MU', 'GV.PA', 'BRFS3.SA', '0QR4.L', 'NESR.HA', 'GRM.SG', 'GLB.L', 'KYGA.L', 'OKL.BE', 'SAP.TO', '1216.TW']



FoodNames = ["Orkla ASA", "Associated British Foods plc", "Associated British Foods plc", "Grupo Bimbo, S.A.B. de C.V.", "Danone", "JBS S.A", "Grupo Bimbo, S.A.B. de C.V.", "The Kraft Heinz Company", "MENGNIU DAIRY", "TINGYI", "WANT WANT CHINA", "GENL MILLS DL -,10", "Genomic Vision Société Anonyme", "BRF S.A", "DANONE S.A. EO -,25", "Nestlé S.A.", "NESTLE NAM. SF-,10", "GENERAL MILLS INC. Registered S", "Glanbia plc", "Kerry Group plc", "ORKLA NK 1,25", "Saputo Inc.", "Uni-President Enterprises Corporation" ]





nullList = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

AerospaceAndDefence = ['BOE.L', 'BA.L', 'PSK.TO', 'NOC', 'MTX.DE', 'S63.SI', 'SAF.PA', 'HO.PA', 'RR.L', 'TXT', 'NTH.SG', 'BA.MX', 'MTXN.MX', 'BSP.DU', 'GD.MX', 'LMT.MX', 'NTH.BE', 'ASTC', 'USAE']

AeroNames = ["The Boeing Company", "BAE Systems plc", "PrairieSky Royalty Ltd.", "Northrop Grumman Corporation", "MTU Aero Engines AG", "Singapore Technologies Engineering Ltd", "Safran SA", "Thales S.A.", "Rolls-Royce Holdings plc", "Textron Inc.", "NORTHROP GRUMMAN CORP. Register", "The Boeing Company", "MTU Aero Engines AG", "BAE SYSTEMS PLC LS-,025","General Dynamics Corporation", "Lockheed Martin Corporation", "NORTHROP GRUMMAN DL 1", "Astrotech Corporation", "U.S. Aerospace, Inc."]



Technology = ['GOOGL', 'AKAM', 'REA.AX', 'BIDU', 'FB', 'Z', 'TWTR', 'VRSN', 'JD', 'TRIP', '0700.HK', 'YNDX', 'NTESN.MX', "NFLX34.SA"]
TechnologyNames = ["Alphabet Inc.", "Akamai Technologies, Inc.", "REA Group Limited", "Baidu, Inc", "Facebook, Inc", "Zillow Group, Inc.", "Twitter, Inc", "VeriSign, Inc.", "JD.com, Inc.", "TripAdvisor, Inc.", "TENCENT", "Yandex N.V.", "IAC/InterActiveCorp", "Netflix, Inc"]

Industry = ['Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology', 'Technology']



# ticker name industry 
print(list(zip(Technology, TechnologyNames, Industry)))
Technology = ['GOOGL', 'AKAM', 'REA.AX', 'BIDU', 'FB', 'Z', 'ZG', 'TWTR', 'VRSN', 'JD', 'TRIP', 'JDN.MX', '0700.HK', 'YNDX', 'BIDUN.MX', 'TWTR.MX', 'B1C.F', 'NTESN.MX', 'IAC', 'B1C.DU']
AerospaceAndDefence = ['BOE.L', 'BA.L', 'PSK.TO', 'NOC', 'MTX.DE', 'S63.SI', 'SAF.PA', 'HO.PA', 'RR.L', 'TXT', 'NTH.SG', 'NTH.F', 'NTH.DU', 'BA.MX', 'BCO.BE', 'MTXN.MX', 'BSP.DU', 'BCO.DE', 'GD.MX', 'LMT.MX', 'LOM.MU', 'NTH.BE', 'TXT.MX', 'UTC1.HA']
Food = ['ORK.OL', 'ABF.L', 'BUFF', 'BIMBOA.MX', 'BN.PA', 'JBSS3.SA', 'KHC', 'GRUMAB.MX', 'DNN.MI', 'KHC.MX', '2319.HK', '0322.HK', '0151.HK', 'GRM.MU', 'GV.PA', 'BNN.MX', 'BRFS3.SA', 'BSN.HA', '0QR4.L', 'NESR.HA', 'GRM.SG', 'GLB.L', 'KYGA.L', 'NESR.MU', 'OKL.BE', 'SAP.TO', '1216.TW']

