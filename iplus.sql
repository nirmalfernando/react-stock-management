create database iplus;

use iplus;

create table user(
	userid int primary key auto_increment,
    username varchar(255) unique,
    name varchar(255),
    password varchar(255),
    email varchar(255),
    phoneno varchar(11),
    image varchar(255),
    status varchar(100),
    statusdate datetime
);

create table category(
	categoryid int primary key auto_increment,
    categoryname varchar(100),
    enteredby varchar(255),
    status varchar(100),
    statusdate datetime
);

create table product(
	productid int primary key auto_increment,
	sku varchar(100),
    productname varchar(255),
    category varchar(100),
    categoryid int,
    brand varchar(255),
    variant varchar(255),
    purchaseprice double,
    sellingprice double,
    image varchar(255),
    enteredby varchar(255),
    status varchar(100),
    statusdate datetime
);

CREATE TABLE goodreceive(
	grnno int PRIMARY KEY auto_increment,
    invoiceid int,
    date datetime,
    discount double,
    tax double,
    total double,
    enteredby varchar(255)
);

CREATE TABLE goodreceive_details(
	id int PRIMARY KEY auto_increment,
	grnno int,
    sku varchar(100),
    product varchar(255),
    unitprice double,
    qty int,
    total double,
    FOREIGN KEY (grnno) REFERENCES goodreceive(grnno)
);

CREATE TABLE salesorder(
	id int PRIMARY KEY auto_increment,
    date datetime,
    tax double,
    discount double,
    total double,
    amountpaid double,
    balance double,
    enteredby varchar(255)
);

CREATE TABLE salesorder_details(
	id int PRIMARY KEY auto_increment,
    salesorderid int,
    sku varchar(100),
    product varchar(255),
    qty int,
    unitprice double,
    total double,
	FOREIGN KEY (salesorderid) REFERENCES salesorder(id)	
);

CREATE TABLE goodreturn(
	grnno int PRIMARY KEY auto_increment,
    billid int,
    date datetime,
    discount double,
    tax double,
    total double,
    enteredby varchar(255),
    FOREIGN KEY (billid) REFERENCES salesorder(id)
);

CREATE TABLE goodreturn_details(
	id int PRIMARY KEY auto_increment,
	grnno int,
    sku varchar(100),
    product varchar(255),
    unitprice double,
    qty int,
    total double,
    FOREIGN KEY (grnno) REFERENCES goodreturn(grnno)
);
