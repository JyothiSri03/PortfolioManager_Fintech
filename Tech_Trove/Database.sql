CREATE DATABASE IF NOT EXISTS techtrove;

USE techtrove;
drop table  gold_investments;
CREATE TABLE gold_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20) default 'Gold',
  quantity FLOAT,
  purchase_price FLOAT,
  current_price FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
show tables;
select * from gold_investments;

CREATE TABLE stock_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quantity FLOAT,
  purchase_price FLOAT,
  current_price FLOAT
);

CREATE TABLE mutual_funds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),
  fund_name VARCHAR(50),
  quantity FLOAT NOT NULL,
  purchase_price FLOAT NOT NULL,
  current_price FLOAT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
drop table mutual_funds;
select * from mutual_funds;
CREATE TABLE property_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quantity FLOAT,
  purchase_price FLOAT,
  current_price FLOAT
);
drop table stock_investments;
CREATE TABLE stock_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(50),
  quantity FLOAT,
  purchase_price FLOAT,
  current_price FLOAT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from stock_investments;

use techtrove;
drop table property_investments;



CREATE TABLE property_investments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(20),
  quantity FLOAT,
  purchase_price FLOAT,
  current_price FLOAT
);
select * from property_investments;
ALTER TABLE gold_investments ADD COLUMN sold BOOLEAN DEFAULT FALSE;
ALTER TABLE stock_investments ADD COLUMN sold BOOLEAN DEFAULT FALSE;
ALTER TABLE mutual_funds ADD COLUMN sold BOOLEAN DEFAULT FALSE;
ALTER TABLE propety_investments ADD COLUMN sold BOOLEAN DEFAULT FALSE;