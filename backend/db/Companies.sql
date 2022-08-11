

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `COMPANIES`;
CREATE DATABASE `COMPANIES`;
USE `COMPANIES`;
CREATE TABLE `COMPANIES` (
  `ticker` varchar(50) NOT NULL,
  `name` varchar(120) NOT NULL,
  `industry` varchar(120) NOT NULL,
  `price` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `env` float DEFAULT NULL,
  `soc` float DEFAULT NULL,
  `gov` float DEFAULT NULL,
  PRIMARY KEY (ticker)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `COMPANIES` (`ticker`, `name`, `industry`, `price`, `total`, `env`, `soc`, `gov`) VALUES
('LUV', 'Southwest Airlines Co.', 'Airlines', '38.34', '32', '11.3', '14.9', '6.2'),
('AAPL', 'Apple Inc.', 'Technology', '164.92', '16.0', '0.6', '6.9', '8.9'),
('ORK.OL', 'Orkla ASA', 'Food', null, null, null, null, null), 
('ABF.L', 'Associated British Foods plc', 'Food', null, null, null, null, null), 
('BUFF', 'Associated British Foods plc', 'Food', null, null, null, null, null), ('BIMBOA.MX', 'Grupo Bimbo, S.A.B. de C.V.', 'Food', null, null, null, null, null), ('BN.PA', 'Danone', 'Food', null, null, null, null, null), ('JBSS3.SA', 'JBS S.A', 'Food', null, null, null, null, null), ('KHC', 'Grupo Bimbo, S.A.B. de C.V.', 'Food', null, null, null, null, null), ('GRUMAB.MX', 'The Kraft Heinz Company', 'Food', null, null, null, null, null), ('KHC.MX', 'MENGNIU DAIRY', 'Food', null, null, null, null, null), ('2319.HK', 'TINGYI', 'Food', null, null, null, null, null), ('0322.HK', 'WANT WANT CHINA', 'Food', null, null, null, null, null), ('0151.HK', 'GENL MILLS DL -,10', 'Food', null, null, null, null, null), ('GRM.MU', 'Genomic Vision Société Anonyme', 'Food', null, null, null, null, null), ('GV.PA', 'BRF S.A', 'Food', null, null, null, null, null), ('BRFS3.SA', 'DANONE S.A. EO -,25', 'Food', null, null, null, null, null), ('0QR4.L', 'Nestlé S.A.', 'Food', null, null, null, null, null), ('NESR.HA', 'NESTLE NAM. SF-,10', 'Food', null, null, null, null, null), ('GRM.SG', 'GENERAL MILLS INC. Registered S', 'Food', null, null, null, null, null), ('GLB.L', 'Glanbia plc', 'Food', null, null, null, null, null), ('KYGA.L', 'Kerry Group plc', 'Food', null, null, null, null, null), ('OKL.BE', 'ORKLA NK 1,25', 'Food', null, null, null, null, null), ('SAP.TO', 'Saputo Inc.', 'Food', null, null, null, null, null), ('1216.TW', 'Uni-President Enterprises Corporation', 'Food', null, null, null, null, null),('BOE.L', 'The Boeing Company', 'AerospaceAndDefence', null, null, null, null, null), ('BA.L', 'BAE Systems plc', 'AerospaceAndDefence', null, null, null, null, null), ('PSK.TO', 'PrairieSky Royalty Ltd.', 'AerospaceAndDefence', null, null, null, null, null), ('NOC', 'Northrop Grumman Corporation', 'AerospaceAndDefence', null, null, null, null, null), ('MTX.DE', 'MTU Aero Engines AG', 'AerospaceAndDefence', null, null, null, null, null), ('S63.SI', 'Singapore Technologies Engineering Ltd', 'AerospaceAndDefence', null, null, null, null, null), ('SAF.PA', 'Safran SA', 'AerospaceAndDefence', null, null, null, null, null), ('HO.PA', 'Thales S.A.', 'AerospaceAndDefence', null, null, null, null, null), ('RR.L', 'Rolls-Royce Holdings plc', 'AerospaceAndDefence', null, null, null, null, null), ('TXT', 'Textron Inc.', 'AerospaceAndDefence', null, null, null, null, null), ('NTH.SG', 'NORTHROP GRUMMAN CORP. Register', 'AerospaceAndDefence', null, null, null, null, null), ('BA.MX', 'The Boeing Company', 'AerospaceAndDefence', null, null, null, null, null), ('MTXN.MX', 'MTU Aero Engines AG', 'AerospaceAndDefence', null, null, null, null, null), ('BSP.DU', 'BAE SYSTEMS PLC LS-,025', 'AerospaceAndDefence', null, null, null, null, null), ('GD.MX', 'General Dynamics Corporation', 'AerospaceAndDefence', null, null, null, null, null), ('LMT.MX', 'Lockheed Martin Corporation', 'AerospaceAndDefence', null, null, null, null, null), ('NTH.BE', 'NORTHROP GRUMMAN DL 1', 'AerospaceAndDefence', null, null, null, null, null), ('ASTC', 'Astrotech Corporation', 'AerospaceAndDefence', null, null, null, null, null), ('USAE', 'U.S. Aerospace, Inc.', 'AerospaceAndDefence', null, null, null, null, null), ('GOOGL', 'Alphabet Inc.', 'Technology', null, null, null, null, null), ('AKAM', 'Akamai Technologies, Inc.', 'Technology', null, null, null, null, null), ('REA.AX', 'REA Group Limited', 'Technology', null, null, null, null, null), ('BIDU', 'Baidu, Inc', 'Technology', null, null, null, null, null), ('FB', 'Facebook, Inc', 'Technology', null, null, null, null, null), ('Z', 'Zillow Group, Inc.', 'Technology', null, null, null, null, null), ('TWTR', 'Twitter, Inc', 'Technology', null, null, null, null, null), ('VRSN', 'VeriSign, Inc.', 'Technology', null, null, null, null, null), ('JD', 'JD.com, Inc.', 'Technology', null, null, null, null, null), ('TRIP', 'TripAdvisor, Inc.', 'Technology', null, null, null, null, null), ('0700.HK', 'TENCENT', 'Technology', null, null, null, null, null), ('YNDX', 'Yandex N.V.', 'Technology', null, null, null, null, null), ('NTESN.MX', 'IAC/InterActiveCorp', 'Technology', null, null, null, null, null), ('NFLX34.SA', 'Netflix, Inc', 'Technology', null, null, null, null, null),('AMGN', 'Amgen Inc.', 'BioTechnology', null, null, null, null, null),
('LIFE', 'aTyr Pharma, Inc.', 'BioTechnology', null, null, null, null, null),
('CSL.AX', 'CSL Limited', 'BioTechnology', null, null, null, null, null),
('BIIB', 'Biogen Inc.', 'BioTechnology', null, null, null, null, null),
('BMRN', 'BioMarin Pharmaceutical Inc.', 'BioTechnology', null, null, null, null, null),
('TECH', 'Bio-Techne Corporation', 'BioTechnology', null, null, null, null, null),
('UCB.BR', 'UCB SA', 'BioTechnology', null, null, null, null, null),
('INCY', 'Incyte Corporation', 'BioTechnology', null, null, null, null, null),
('JAZZ', 'Jazz Pharmaceuticals Public Limited Company', 'BioTechnology', null, null, null, null, null),
('CERS', 'Cerus Corporation', 'BioTechnology', null, null, null, null, null),
('GILD', 'Gilead Sciences, Inc.', 'BioTechnology', null, null, null, null, null),
('SGEN', 'Seattle Genetics, Inc.', 'BioTechnology', null, null, null, null, null),
('REGN', 'Regeneron Pharmaceuticals, Inc.', 'BioTechnology', null, null, null, null, null),
('VRTX', 'Vertex Pharmaceuticals Incorporated', 'BioTechnology', null, null, null, null, null),
('ILMN', 'Illumina, Inc.', 'BioTechnology', null, null, null, null, null),
('SPPI', 'Spectrum Pharmaceuticals, Inc.', 'BioTechnology', null, null, null, null, null),
('CAPS', 'Capstone Therapeutics Corp.', 'BioTechnology', null, null, null, null, null),
('IDP.DU', 'BIOGEN INC. DL -,0005', 'BioTechnology', null, null, null, null, null),
('GIS.DE', 'Gilead Sciences, Inc.', 'BioTechnology', null, null, null, null, null),
('GILD.MX', 'Gilead Sciences, Inc.', 'BioTechnology', null, null, null, null, null),
('VX1.MU', 'VERTEX PHARMAC. DL-,01', 'BioTechnology', null, null, null, null, null),

('SU.TO', 'Suncor Energy Inc.', 'OilAndGas', null, null, null, null, null),
('BP.L', 'BP p.l.c.', 'OilAndGas', null, null, null, null, null),
('PETR4.SA', 'Petr\xc3\xb3leo Brasileiro S.A. - Petrobras', 'OilAndGas', null, null, null, null, null),
('CVE.TO', 'Cenovus Energy Inc.', 'OilAndGas', null, null, null, null, null),
('XOM', 'Exxon Mobil Corporation', 'OilAndGas', null, null, null, null, null),
('CVX', 'Chevron Corporation', 'OilAndGas', null, null, null, null, null),
('CE2.DE', 'CropEnergies AG', 'OilAndGas', null, null, null, null, null),
('REP.MC', 'Repsol, S.A.', 'OilAndGas', null, null, null, null, null),
('ENI.MI', 'Eni S.p.A.', 'OilAndGas', null, null, null, null, null),
('XONA.DU', 'EXXON MOBIL CORP.', 'OilAndGas', null, null, null, null, null),
('XOM.MX', 'Exxon Mobil Corporation', 'OilAndGas', null, null, null, null, null),
('TOT.MI', 'TOTAL S.A.', 'OilAndGas', null, null, null, null, null),
('TOTB.DE', 'TOTAL S.A.', 'OilAndGas', null, null, null, null, null),
('IMO', 'Imperial Oil Limited', 'OilAndGas', null, null, null, null, null),
('ROSN.L', 'Public Joint Stock Company Rosneft Oil Company', 'OilAndGas', null, null, null, null, null),
('IMO.TO', 'Imperial Oil Limited', 'OilAndGas', null, null, null, null, null),
('CHV.F', 'Chevron Corporation', 'OilAndGas', null, null, null, null, null),
('CVX.MX', 'Chevron Corporation', 'OilAndGas', null, null, null, null, null),
('BPE5.DU', 'BP PLC DL-,25', 'OilAndGas', null, null, null, null, null),
('CE2.F', 'CropEnergies AG', 'OilAndGas', null, null, null, null, null),
('0386.HK', 'SINOPEC CORP', 'OilAndGas', null, null, null, null, null),
('0857.HK', 'PETROCHINA', 'OilAndGas', null, null, null, null, null),
('PC6.MU', 'PETROCHINA CO. LTD H YC 1', 'OilAndGas', null, null, null, null, null),
('ENI.MU', 'ENI S.P.A.', 'OilAndGas', null, null, null, null, null),
('REPSN.MX', 'Repsol, S.A.', 'OilAndGas', null, null, null, null, null),
('GALPN.MX', 'Galp Energia, SGPS, S.A.', 'OilAndGas', null, null, null, null, null),
('ONGC.NS', 'Oil and Natural Gas Corporation Limited', 'OilAndGas', null, null, null, null, null),
('TOTB.F', 'TOTAL S.A.', 'OilAndGas', null, null, null, null, null),
('CHV.HA', 'CHEVRON CORP. DL-,75', 'OilAndGas', null, null, null, null, null);


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;