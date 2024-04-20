use iplus;

CREATE TABLE goodreceive(
	grnno int PRIMARY KEY auto_increment,
    invoiceid int,
    date datetime,
    discount double,
    tax double,
    total double
);

use iplus;
select * from goodreceive;

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

use iplus;
select * from goodreceive_details;

CREATE TABLE salesorder(
	id int PRIMARY KEY auto_increment,
    date datetime,
    tax double,
    discount double,
    total double,
    amountpaid double,
    balance double
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

use iplus;
select * from salesorder;
use iplus;
select * from salesorder_details;

CREATE TABLE goodreturn(
	grnno int PRIMARY KEY auto_increment,
    billid int,
    date datetime,
    discount double,
    tax double,
    total double,
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

use iplus;
select * from goodreturn;

use iplus;
select * from goodreturn_details;