-- MySQL dump 10.13  Distrib 8.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: as7
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `as7`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `as7` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `as7`;

--
-- Table structure for table `dimcustomer`
--

DROP TABLE IF EXISTS `dimcustomer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimcustomer` (
  `CustomerID` int NOT NULL,
  `CustomerAltID` int DEFAULT NULL,
  `CustomerName` varchar(255) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimcustomer`
--

LOCK TABLES `dimcustomer` WRITE;
/*!40000 ALTER TABLE `dimcustomer` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimcustomer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimdate`
--

DROP TABLE IF EXISTS `dimdate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimdate` (
  `DateKey` int NOT NULL,
  `FullDateUSA` date DEFAULT NULL,
  `FullDateUK` date DEFAULT NULL,
  `DayOfMonth` int DEFAULT NULL,
  `DaySuffix` varchar(2) DEFAULT NULL,
  `DayName` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`DateKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimdate`
--

LOCK TABLES `dimdate` WRITE;
/*!40000 ALTER TABLE `dimdate` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimdate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimproduct`
--

DROP TABLE IF EXISTS `dimproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimproduct` (
  `ProductKey` int NOT NULL,
  `ProductAltKey` int DEFAULT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `ProductCost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ProductKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimproduct`
--

LOCK TABLES `dimproduct` WRITE;
/*!40000 ALTER TABLE `dimproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimsalesperson`
--

DROP TABLE IF EXISTS `dimsalesperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimsalesperson` (
  `SalesPersonID` int NOT NULL,
  `SalesPersonAltID` int DEFAULT NULL,
  `SalesPersonName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SalesPersonID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimsalesperson`
--

LOCK TABLES `dimsalesperson` WRITE;
/*!40000 ALTER TABLE `dimsalesperson` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimsalesperson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimstore`
--

DROP TABLE IF EXISTS `dimstore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimstore` (
  `StoreID` int NOT NULL,
  `StoreAltID` int DEFAULT NULL,
  `StoreName` varchar(255) DEFAULT NULL,
  `StoreLocation` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`StoreID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimstore`
--

LOCK TABLES `dimstore` WRITE;
/*!40000 ALTER TABLE `dimstore` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimstore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimtime`
--

DROP TABLE IF EXISTS `dimtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dimtime` (
  `TimeKey` int NOT NULL,
  `TimeAltKey` int DEFAULT NULL,
  `Time` time DEFAULT NULL,
  `Hour30` int DEFAULT NULL,
  `MinuteNumber` int DEFAULT NULL,
  PRIMARY KEY (`TimeKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimtime`
--

LOCK TABLES `dimtime` WRITE;
/*!40000 ALTER TABLE `dimtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factproductsales`
--

DROP TABLE IF EXISTS `factproductsales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factproductsales` (
  `TransactionID` int NOT NULL,
  `DateKey` int DEFAULT NULL,
  `TimeKey` int DEFAULT NULL,
  `StoreID` int DEFAULT NULL,
  `CustomerID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `TotalAmount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`TransactionID`),
  KEY `DateKey` (`DateKey`),
  KEY `TimeKey` (`TimeKey`),
  KEY `StoreID` (`StoreID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `factproductsales_ibfk_1` FOREIGN KEY (`DateKey`) REFERENCES `dimdate` (`DateKey`),
  CONSTRAINT `factproductsales_ibfk_2` FOREIGN KEY (`TimeKey`) REFERENCES `dimtime` (`TimeKey`),
  CONSTRAINT `factproductsales_ibfk_3` FOREIGN KEY (`StoreID`) REFERENCES `dimstore` (`StoreID`),
  CONSTRAINT `factproductsales_ibfk_4` FOREIGN KEY (`CustomerID`) REFERENCES `dimcustomer` (`CustomerID`),
  CONSTRAINT `factproductsales_ibfk_5` FOREIGN KEY (`ProductID`) REFERENCES `dimproduct` (`ProductKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factproductsales`
--

LOCK TABLES `factproductsales` WRITE;
/*!40000 ALTER TABLE `factproductsales` DISABLE KEYS */;
/*!40000 ALTER TABLE `factproductsales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-08 20:24:40
