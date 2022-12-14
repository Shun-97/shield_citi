SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone
= "+08:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `CUSTOMER`;
CREATE DATABASE `CUSTOMER`;
USE `CUSTOMER`;


DROP TABLE IF EXISTS `NEW_CUST_KYC`;
CREATE TABLE `NEW_CUST_KYC` (
    `cid` int NOT NULL,
    `name` varchar(99) NOT NULL,
    `risk_Appetite` int NOT NULL,
    PRIMARY KEY(cid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `NEW_CUST_KYC` (`cid`, `name`, `risk_appetite`) VALUES
(1, 'Alex', 50),
(2, 'Bobby', 45),
(3, 'Charlie', 30),
(4, 'Denise', 25),
(5, 'Edward', 55);

DROP TABLE IF EXISTS `EXISTING_CUST_PORTFOLIO`;
CREATE TABLE `EXISTING_CUST_PORTFOLIO`
(
    `cid` int NOT NULL,
    `ticker` varchar(50) NOT NULL,
    `qty` int(11) NOT NULL,  
    PRIMARY KEY(cid, ticker)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `EXISTING_CUST_PORTFOLIO` (`cid`, `ticker`, `qty`) VALUES
('1', 'AAPL', 85),
('1', 'GOOGL', 3),
('1', 'NFLX', 100);

DROP TABLE IF EXISTS `NEW_CUST_PREFERRED_INDUSTRY`;
CREATE TABLE `NEW_CUST_PREFERRED_INDUSTRY`
(
    `cid` varchar(50) NOT NULL,
    `preferred_industry` varchar(50) NOT NULL
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `NEW_CUST_PREFERRED_INDUSTRY` (`cid`, `preferred_industry`) VALUES
(1, 'Technology'),
(1, 'Oil and Gas'),
(1, 'Biotechnology');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;