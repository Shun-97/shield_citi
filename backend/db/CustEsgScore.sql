

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP DATABASE IF EXISTS `CUST_ESG_SCORE`;
CREATE DATABASE `CUST_ESG_SCORE`;
USE `CUST_ESG_SCORE`;
DROP TABLE IF EXISTS `CUST_ESG_SCORE`;
CREATE TABLE `CUST_ESG_SCORE` (
  `cid` int NOT NULL,
  `env` float DEFAULT NULL,
  `soc` float DEFAULT NULL,
  `gov` float DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `CUST_ESG_SCORE` (`cid`, `env`, `soc`, `gov`) VALUES
(1, 48.2, 30.3, 22.5),
(2, 32.5, 12.3, 43.2),
(3, 25.5, 17.9, 23.5);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;