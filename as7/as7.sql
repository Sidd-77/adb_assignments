CREATE TABLE DimCustomer (
    CustomerID INT PRIMARY KEY,
    CustomerAltID INT,
    CustomerName VARCHAR(255),
    Gender CHAR(1)
);

CREATE TABLE DimProduct (
    ProductKey INT PRIMARY KEY,
    ProductAltKey INT,
    ProductName VARCHAR(255),
    ProductCost DECIMAL(10,2)
);

CREATE TABLE DimDate (
    DateKey INT PRIMARY KEY,
    FullDateUSA DATE,
    FullDateUK DATE,
    DayOfMonth INT,
    DaySuffix VARCHAR(2),
    DayName VARCHAR(9)
);

CREATE TABLE DimStore (
    StoreID INT PRIMARY KEY,
    StoreAltID INT,
    StoreName VARCHAR(255),
    StoreLocation VARCHAR(255),
    City VARCHAR(255)
);

CREATE TABLE DimTime (
    TimeKey INT PRIMARY KEY,
    TimeAltKey INT,
    Time TIME,
    Hour30 INT,
    MinuteNumber INT
);

CREATE TABLE DimSalesPerson (
    SalesPersonID INT PRIMARY KEY,
    SalesPersonAltID INT,
    SalesPersonName VARCHAR(255)
);

CREATE TABLE FactProductSales (
    TransactionID INT PRIMARY KEY,
    DateKey INT,
    TimeKey INT,
    StoreID INT,
    CustomerID INT,
    ProductID INT,
    Quantity INT,
    TotalAmount DECIMAL(10,2),
    FOREIGN KEY (DateKey) REFERENCES DimDate(DateKey),
    FOREIGN KEY (TimeKey) REFERENCES DimTime(TimeKey),
    FOREIGN KEY (StoreID) REFERENCES DimStore(StoreID),
    FOREIGN KEY (CustomerID) REFERENCES DimCustomer(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES DimProduct(ProductKey)
);