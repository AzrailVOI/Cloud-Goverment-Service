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
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `code` char(3) NOT NULL,
  `name` varchar(200) NOT NULL,
  `iso` char(2) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES ('ABW','Aruba','AW'),('AFG','Afghanistan','AF'),('AGO','Angola','AO'),('AIA','Anguilla','AI'),('ALA','Åland','AX'),('ALB','Albania','AL'),('AND','Andorra','AD'),('ARE','United Arab Emirates','AE'),('ARG','Argentina','AR'),('ARM','Armenia','AM'),('ASM','American Samoa','AS'),('ATA','Antarctica','AQ'),('ATF','French Southern Territories','TF'),('ATG','Antigua and Barbuda','AG'),('AUS','Australia','AU'),('AUT','Austria','AT'),('AZE','Azerbaijan','AZ'),('BDI','Burundi','BI'),('BEL','Belgium','BE'),('BEN','Benin','BJ'),('BES','Bonaire','BQ'),('BFA','Burkina Faso','BF'),('BGD','Bangladesh','BD'),('BGR','Bulgaria','BG'),('BHR','Bahrain','BH'),('BHS','Bahamas','BS'),('BIH','Bosnia and Herzegovina','BA'),('BLM','Saint Barthélemy','BL'),('BLR','Belarus','BY'),('BLZ','Belize','BZ'),('BMU','Bermuda','BM'),('BOL','Bolivia','BO'),('BRA','Brazil','BR'),('BRB','Barbados','BB'),('BRN','Brunei','BN'),('BTN','Bhutan','BT'),('BVT','Bouvet Island','BV'),('BWA','Botswana','BW'),('CAF','Central African Republic','CF'),('CAN','Canada','CA'),('CCK','Cocos [Keeling] Islands','CC'),('CHE','Switzerland','CH'),('CHL','Chile','CL'),('CHN','China','CN'),('CIV','Ivory Coast','CI'),('CMR','Cameroon','CM'),('COD','Democratic Republic of the Congo','CD'),('COG','Republic of the Congo','CG'),('COK','Cook Islands','CK'),('COL','Colombia','CO'),('COM','Comoros','KM'),('CPV','Cape Verde','CV'),('CRI','Costa Rica','CR'),('CUB','Cuba','CU'),('CUW','Curacao','CW'),('CXR','Christmas Island','CX'),('CYM','Cayman Islands','KY'),('CYP','Cyprus','CY'),('CZE','Czech Republic','CZ'),('DEU','Germany','DE'),('DJI','Djibouti','DJ'),('DMA','Dominica','DM'),('DNK','Denmark','DK'),('DOM','Dominican Republic','DO'),('DZA','Algeria','DZ'),('ECU','Ecuador','EC'),('EGY','Egypt','EG'),('ERI','Eritrea','ER'),('ESH','Western Sahara','EH'),('ESP','Spain','ES'),('EST','Estonia','EE'),('ETH','Ethiopia','ET'),('FIN','Finland','FI'),('FJI','Fiji','FJ'),('FLK','Falkland Islands','FK'),('FRA','France','FR'),('FRO','Faroe Islands','FO'),('FSM','Micronesia','FM'),('GAB','Gabon','GA'),('GBR','United Kingdom','GB'),('GEO','Georgia','GE'),('GGY','Guernsey','GG'),('GHA','Ghana','GH'),('GIB','Gibraltar','GI'),('GIN','Guinea','GN'),('GLP','Guadeloupe','GP'),('GMB','Gambia','GM'),('GNB','Guinea-Bissau','GW'),('GNQ','Equatorial Guinea','GQ'),('GRC','Greece','GR'),('GRD','Grenada','GD'),('GRL','Greenland','GL'),('GTM','Guatemala','GT'),('GUF','French Guiana','GF'),('GUM','Guam','GU'),('GUY','Guyana','GY'),('HKG','Hong Kong','HK'),('HMD','Heard Island and McDonald Islands','HM'),('HND','Honduras','HN'),('HRV','Croatia','HR'),('HTI','Haiti','HT'),('HUN','Hungary','HU'),('IDN','Indonesia','ID'),('IMN','Isle of Man','IM'),('IND','India','IN'),('IOT','British Indian Ocean Territory','IO'),('IRL','Ireland','IE'),('IRN','Iran','IR'),('IRQ','Iraq','IQ'),('ISL','Iceland','IS'),('ISR','Israel','IL'),('ITA','Italy','IT'),('JAM','Jamaica','JM'),('JEY','Jersey','JE'),('JOR','Jordan','JO'),('JPN','Japan','JP'),('KAZ','Kazakhstan','KZ'),('KEN','Kenya','KE'),('KGZ','Kyrgyzstan','KG'),('KHM','Cambodia','KH'),('KIR','Kiribati','KI'),('KNA','Saint Kitts and Nevis','KN'),('KOR','South Korea','KR'),('KWT','Kuwait','KW'),('LAO','Laos','LA'),('LBN','Lebanon','LB'),('LBR','Liberia','LR'),('LBY','Libya','LY'),('LCA','Saint Lucia','LC'),('LIE','Liechtenstein','LI'),('LKA','Sri Lanka','LK'),('LSO','Lesotho','LS'),('LTU','Lithuania','LT'),('LUX','Luxembourg','LU'),('LVA','Latvia','LV'),('MAC','Macao','MO'),('MAF','Saint Martin','MF'),('MAR','Morocco','MA'),('MCO','Monaco','MC'),('MDA','Moldova','MD'),('MDG','Madagascar','MG'),('MDV','Maldives','MV'),('MEX','Mexico','MX'),('MHL','Marshall Islands','MH'),('MKD','Macedonia','MK'),('MLI','Mali','ML'),('MLT','Malta','MT'),('MMR','Myanmar [Burma]','MM'),('MNE','Montenegro','ME'),('MNG','Mongolia','MN'),('MNP','Northern Mariana Islands','MP'),('MOZ','Mozambique','MZ'),('MRT','Mauritania','MR'),('MSR','Montserrat','MS'),('MTQ','Martinique','MQ'),('MUS','Mauritius','MU'),('MWI','Malawi','MW'),('MYS','Malaysia','MY'),('MYT','Mayotte','YT'),('NAM','Namibia','NA'),('NCL','New Caledonia','NC'),('NER','Niger','NE'),('NFK','Norfolk Island','NF'),('NGA','Nigeria','NG'),('NIC','Nicaragua','NI'),('NIU','Niue','NU'),('NLD','Netherlands','NL'),('NOR','Norway','NO'),('NPL','Nepal','NP'),('NRU','Nauru','NR'),('NZL','New Zealand','NZ'),('OMN','Oman','OM'),('PAK','Pakistan','PK'),('PAN','Panama','PA'),('PCN','Pitcairn Islands','PN'),('PER','Peru','PE'),('PHL','Philippines','PH'),('PLW','Palau','PW'),('PNG','Papua New Guinea','PG'),('POL','Poland','PL'),('PRI','Puerto Rico','PR'),('PRK','North Korea','KP'),('PRT','Portugal','PT'),('PRY','Paraguay','PY'),('PSE','Palestine','PS'),('PYF','French Polynesia','PF'),('QAT','Qatar','QA'),('REU','Réunion','RE'),('ROU','Romania','RO'),('RUS','Russian Federation','RU'),('RWA','Rwanda','RW'),('SAU','Saudi Arabia','SA'),('SDN','Sudan','SD'),('SEN','Senegal','SN'),('SGP','Singapore','SG'),('SGS','South Georgia and the South Sandwich Islands','GS'),('SHN','Saint Helena','SH'),('SJM','Svalbard and Jan Mayen','SJ'),('SLB','Solomon Islands','SB'),('SLE','Sierra Leone','SL'),('SLV','El Salvador','SV'),('SMR','San Marino','SM'),('SOM','Somalia','SO'),('SPM','Saint Pierre and Miquelon','PM'),('SRB','Serbia','RS'),('SSD','South Sudan','SS'),('STP','São Tomé and Príncipe','ST'),('SUR','Suriname','SR'),('SVK','Slovakia','SK'),('SVN','Slovenia','SI'),('SWE','Sweden','SE'),('SWZ','Swaziland','SZ'),('SXM','Sint Maarten','SX'),('SYC','Seychelles','SC'),('SYR','Syria','SY'),('TCA','Turks and Caicos Islands','TC'),('TCD','Chad','TD'),('TGO','Togo','TG'),('THA','Thailand','TH'),('TJK','Tajikistan','TJ'),('TKL','Tokelau','TK'),('TKM','Turkmenistan','TM'),('TLS','East Timor','TL'),('TON','Tonga','TO'),('TTO','Trinidad and Tobago','TT'),('TUN','Tunisia','TN'),('TUR','Turkey','TR'),('TUV','Tuvalu','TV'),('TWN','Taiwan','TW'),('TZA','Tanzania','TZ'),('UGA','Uganda','UG'),('UKR','Ukraine','UA'),('UMI','United States Minor Outlying Islands','UM'),('URY','Uruguay','UY'),('USA','United States','US'),('UZB','Uzbekistan','UZ'),('VAT','Vatican City','VA'),('VCT','Saint Vincent and the Grenadines','VC'),('VEN','Venezuela','VE'),('VGB','British Virgin Islands','VG'),('VIR','United States Virgin Islands','VI'),('VNM','Vietnam','VN'),('VUT','Vanuatu','VU'),('WLF','Wallis and Futuna','WF'),('WSM','Samoa','WS'),('XKX','Kosovo','XK'),('YEM','Yemen','YE'),('ZAF','South Africa','ZA'),('ZMB','Zambia','ZM'),('ZWE','Zimbabwe','ZW');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
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
