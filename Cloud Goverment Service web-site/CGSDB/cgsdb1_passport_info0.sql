-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cgsdb1
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `passport_info`
--

DROP TABLE IF EXISTS `passport_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passport_info` (
  `user_id` int DEFAULT NULL,
  `MiddleName_ua` varchar(255) DEFAULT NULL,
  `MiddleName_ru` varchar(255) DEFAULT NULL,
  `MiddleName_en` varchar(255) DEFAULT NULL,
  `FirstName_ua` varchar(255) DEFAULT NULL,
  `FirstName_ru` varchar(255) DEFAULT NULL,
  `FirstName_en` varchar(255) DEFAULT NULL,
  `LastName_ua` varchar(255) DEFAULT NULL,
  `LastName_ru` varchar(255) DEFAULT NULL,
  `LastName_en` varchar(255) DEFAULT NULL,
  `DayOfBirth` varchar(10) DEFAULT NULL,
  `Nationality_ua` varchar(255) DEFAULT NULL,
  `Nationality_ru` varchar(255) DEFAULT NULL,
  `Nationality_en` varchar(255) DEFAULT NULL,
  `DocumentNumber` varchar(255) DEFAULT NULL,
  `DateOfExpiry` varchar(10) DEFAULT NULL,
  `DateOfIssue` varchar(10) DEFAULT NULL,
  `Authority_ua` varchar(255) DEFAULT NULL,
  `Authority_ru` varchar(255) DEFAULT NULL,
  `Authority_en` varchar(255) DEFAULT NULL,
  `ITN` varchar(255) DEFAULT NULL,
  `Sex_ua` varchar(255) DEFAULT NULL,
  `Sex_ru` varchar(255) DEFAULT NULL,
  `Sex_en` varchar(255) DEFAULT NULL,
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passport_info`
--

LOCK TABLES `passport_info` WRITE;
/*!40000 ALTER TABLE `passport_info` DISABLE KEYS */;
INSERT INTO `passport_info` VALUES (1,'Ілліч','Ильич','Illych','Владислав','Владыслав','Vladyslav','Овчарук','Овчарук','Ovcharuk','14.01.2005','Україна','Украина','Ukraine','0071734223','21.01.2026','21.01.2021','Орган 1433','Орган 1433','Agency 1433','3435678899','чоловіча','мужской','male'),(2,'Григорович','Григорьевич','Hryhorovych','Тарас','Тарас','Taras','Шевченко','Шевченко','Shevchenko','09.03.1814','Словаччина','Словакия','Slovak','007174987','10.03.1861','12.12.1828','Орган 1433','Орган 1433','Agency 1433','3848723154','чоловіча','мужской','male'),(3,'Джон','Джон','John','Джо','Джо','Joe','Дое','Дое','Doe','14.03.2000','Німеччина','Германия','Germany','0071098723','12.09.2026','12.09.2020','Орган 1456','Орган 1456','Agency 1456','3438765899','чоловіча','мужской','male');
/*!40000 ALTER TABLE `passport_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-01  6:44:45
