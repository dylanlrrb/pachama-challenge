CREATE DATABASE demo;

USE demo;

CREATE TABLE forests (
  id INT NOT NULL AUTO_INCREMENT,
  forest_name VARCHAR(255) NOT NULL,
  thumbnail_image VARCHAR(255) NOT NULL,
  forest_type VARCHAR(255) NOT NULL,
  description_brief VARCHAR(255) NOT NULL,
  description_long VARCHAR(255) NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  hectares VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

LOAD DATA INFILE '~/../../data/forests.csv'
INTO TABLE forests
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, forest_name, thumbnail_image, forest_type, description_brief, description_long, latitude, longitude, hectares, country);

CREATE TABLE health_metrics (
  id INT NOT NULL AUTO_INCREMENT,
  forest_name VARCHAR(255) NOT NULL,
  collection_time TIMESTAMP NOT NULL,
  carbon_tonnage INT NOT NULL,
  PRIMARY KEY (id)
);

LOAD DATA INFILE '~/../../data/health_metrics.csv'
INTO TABLE health_metrics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, forest_name, collection_time, carbon_tonnage);

