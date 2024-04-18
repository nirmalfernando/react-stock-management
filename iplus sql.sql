CREATE DATABASE iplus;
use iplus;
CREATE TABLE user(
	userid int PRIMARY KEY,
    username varchar(255),
    name varchar(255),
    password varchar(255),
    email varchar(255),
    phoneno varchar(45),
    image varchar(255),
    role varchar(45),
    status varchar(255),
    statusdate datetime);
    
use iplus;
select * from user;

CREATE TABLE category(
	categoryid int PRIMARY KEY,
    category varchar(255),
    status varchar(255),
    statusdate datetime);
    
use iplus;
select * from category;

CREATE TABLE product (
    productid INT PRIMARY KEY AUTO_INCREMENT,
    productname VARCHAR(255),
    category VARCHAR(100),
    categoryid INT,
    brand VARCHAR(255),
    variant VARCHAR(255),
    sku VARCHAR(100) UNIQUE, -- Adding UNIQUE constraint
    purchaseprice DOUBLE,
    sellingprice DOUBLE,
    image VARCHAR(255),
    status VARCHAR(255),
    statusdate DATETIME,
    FOREIGN KEY (categoryid) REFERENCES category(categoryid)
);

use iplus;
select * from product;

CREATE TABLE purchasingorder (
    poid INT PRIMARY KEY AUTO_INCREMENT,
    product VARCHAR(255),
    sku VARCHAR(100),
    unitprice DOUBLE,
    qty INT,
    total DOUBLE,
    status VARCHAR(255),
    statusdate DATETIME,
    FOREIGN KEY (sku) REFERENCES product(sku) -- Adding foreign key constraint
);

use iplus;
select * from purchasingorder;

