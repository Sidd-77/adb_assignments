create database mart;

CREATE TABLE Dimproduct(
	productkey varchar(20) primary key,
    productaltkey varchar(20),
    productname varchar(20),
    productcost varchar(20)
); 


INSERT INTO Dimproduct VALUES (1, '1', 'A', 29.39);
INSERT INTO Dimproduct VALUES (2, '2', 'B', 39.29);
INSERT INTO Dimproduct VALUES (3, '3', 'C', 7.77);
INSERT INTO Dimproduct VALUES (4, '4', 'D', 4.83);

SELECT * from Dimproduct;


CREATE TABLE Dim_date (
    date_id integer PRIMARY KEY,
    date DATE NOT NULL,
    full_date_uk VARCHAR(20) NOT NULL,
    full_date_usa VARCHAR(20) NOT NULL,
    day_of_month INTEGER NOT NULL,
    day_suffix VARCHAR(20) NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    day_of_week_usa INTEGER NOT NULL,
    day_of_week_uk INTEGER NOT NULL,
    day_of_week_in_month INTEGER NOT NULL,
    day_of_week_in_year INTEGER NOT NULL,
    day_of_quarter INTEGER NOT NULL,
    day_of_year INTEGER NOT NULL,
    week_of_month INTEGER NOT NULL,
    week_of_quarter INTEGER NOT NULL,
    week_of_year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    month_of_quarter INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    quarter_name VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    year_name VARCHAR(20) NOT NULL,
    month_year VARCHAR(7) NOT NULL,
    mmyyyy VARCHAR(6) NOT NULL,
    first_day_of_month DATE NOT NULL,
    last_day_of_month DATE NOT NULL,
    first_day_of_quarter DATE NOT NULL,
    last_day_of_quarter DATE NOT NULL,
    first_day_of_year DATE NOT NULL,
    last_day_of_year DATE NOT NULL,
    is_holiday_usa CHAR(1) NOT NULL,
    is_weekday CHAR(1) NOT NULL,
    holiday_usa VARCHAR(50),
    is_holiday_uk CHAR(1) NOT NULL,
    holiday_uk VARCHAR(50),
    fiscal_day_of_year INTEGER NOT NULL,
    fiscal_week_of_year INTEGER NOT NULL,
    fiscal_month INTEGER NOT NULL,
    fiscal_quarter INTEGER NOT NULL,
    fiscal_quarter_name VARCHAR(20) NOT NULL,
    fiscal_year INTEGER NOT NULL,
    fiscal_year_name VARCHAR(20) NOT NULL,
    fiscal_month_year VARCHAR(7) NOT NULL,
    fiscal_mmyyyy VARCHAR(6) NOT NULL,
    fiscal_first_day_of_month DATE NOT NULL,
    fiscal_last_day_of_month DATE NOT NULL,
    fiscal_first_day_of_quarter DATE NOT NULL,
    fiscal_last_day_of_quarter DATE NOT NULL,
    fiscal_first_day_of_year DATE NOT NULL,
    fiscal_last_day_of_year DATE NOT NULL
);


create table Dimcustomer (
    CustomerID INTEGER PRIMARY KEY,
    CustomerAltId VARCHAR(20),
    CustomerName VARCHAR(30),
    Gender VARCHAR(10)
);

insert into Dimcustomer VALUES (1, '1', 'The Undertaker', 'Male');
insert into Dimcustomer VALUES (2, '2', 'Micky James', 'Female');
insert into Dimcustomer VALUES (3, '3', 'John Cena', 'Male');
insert into Dimcustomer VALUES (4, '4', 'Ronda Rousey', 'Female');
insert into Dimcustomer VALUES (5, '5', 'Dean Ambrose', 'Male');

SELECT * from Dimcustomer;


create table Dimtime (
  TimeKey INTEGER PRIMARY KEY,
  TimeAltKey VARCHAR(30),
  Time30 DATE,
  Hour30 VARCHAR(20),
  MinuteNumber VARCHAR(20),
  SecondNumber VARCHAR(20),
  TimeInSecond INTEGER,
  HourlyBucket VARCHAR(30),
  DayTimeBucketGroupKey INTEGER,
  DayTimeBucket VARCHAR(30)
);

insert into Dimtime VALUES (1, 'AltKey1', '2022-01-01', '00', '00', '00', 0, 'Hour1', 1, 'DayTimeBucket1');
insert into Dimtime VALUES (2, 'AltKey2', '2022-01-01', '01', '00', '00', 3600, 'Hour2', 1, 'DayTimeBucket1');
insert into Dimtime VALUES (3, 'AltKey3', '2022-01-01', '02', '00', '00', 7200, 'Hour3', 1, 'DayTimeBucket1');
insert into Dimtime VALUES (4, 'AltKey4', '2022-01-01', '03', '00', '00', 10800, 'Hour4', 1, 'DayTimeBucket1');
insert into Dimtime VALUES (5, 'AltKey5', '2022-01-01', '04', '00', '00', 14400, 'Hour5', 1, 'DayTimeBucket1');

select * from Dimtime;

create table Dimstores (
    StoreID INTEGER PRIMARY KEY,
    StoreAltId INTEGER,
    StoreName VARCHAR(30),
    StoreLocation VARCHAR(30),
    City VARCHAR(30),
    State VARCHAR(30),
    Country VARCHAR(30)
);


insert into Dimstores (StoreID, StoreAltId, StoreName, StoreLocation, City, State, Country)
VALUES (1, 1001, 'Store 1', 'Main Street', 'New York', 'NY', 'USA');
insert into Dimstores (StoreID, StoreAltId, StoreName, StoreLocation, City, State, Country)
VALUES (2, 1002, 'Store 2', 'Broadway', 'Los Angeles', 'CA', 'USA');
insert into Dimstores (StoreID, StoreAltId, StoreName, StoreLocation, City, State, Country)
VALUES (3, 1003, 'Store 3', 'High Street', 'London', 'England', 'UK');
insert into Dimstores (StoreID, StoreAltId, StoreName, StoreLocation, City, State, Country)
VALUES (4, 1004, 'Store 4', 'Champs-Élysées', 'Paris', 'Île-de-France', 'France');

select * from Dimstores;


create table Dimsalesperson (
  salesPersonId INTEGER PRIMARY KEY,
  SalesPersonAltID VARCHAR(30),
  SalesPersonName VARCHAR(30),
  StoreID INTEGER,
  City VARCHAR(30),
  State VARCHAR(30),
  Country VARCHAR(30)
);


insert into Dimsalesperson VALUES (1, 'SP1', 'John Smith', 1, 'New York', 'NY', 'USA');
insert into Dimsalesperson VALUES (2, 'SP2', 'Emily Brown', 2, 'Los Angeles', 'CA', 'USA');
insert into Dimsalesperson VALUES (3, 'SP3', 'David Johnson', 1, 'New York', 'NY', 'USA');
insert into Dimsalesperson VALUES (4, 'SP4', 'Lisa Davis', 3, 'Chicago', 'IL', 'USA');
insert into Dimsalesperson VALUES (5, 'SP5', 'Michael Wilson', 2, 'Los Angeles', 'CA', 'USA');

select * from Dimsalesperson;


create table FactProductSales (
    TransactionId INTEGER PRIMARY KEY,
    SalesTimeKey INTEGER,
    Quantity INTEGER,
    TotalAmount INTEGER,
    DateKey INTEGER,
    TimeKey INTEGER,
    SalesDateKey INTEGER,
    SalesTimeAltKey INTEGER,
    StoreID INTEGER,
    CustomerID INTEGER,
    ProductID varchar(20),
    SalesPersonID INTEGER,
    FOREIGN KEY (SalesDateKey) REFERENCES Dim_date(date_id),
    FOREIGN KEY (SalesTimeAltKey) REFERENCES Dimtime(timeKey),
    FOREIGN KEY (StoreID) REFERENCES Dimstores(StoreID),
    FOREIGN KEY (CustomerID) REFERENCES Dimcustomer(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Dimproduct(Productkey),
    FOREIGN KEY (SalesPersonID) REFERENCES Dimsalesperson(SalesPersonID)
);
