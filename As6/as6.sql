CREATE TABLE DimCustomer (
    Customer_id INT PRIMARY KEY,
    Customer_name VARCHAR(255),
    City_id INT,
    First_order_date DATE,
    tourism_guide VARCHAR(255),
    post_address VARCHAR(255)
);

CREATE TABLE DimItem (
    Item_id INT PRIMARY KEY,
    Description VARCHAR(255),
    Size INT,
    Weight INT,
    Unit_price DECIMAL(10, 2)
);

CREATE TABLE DimOrder (
    Order_no INT PRIMARY KEY,
    Order_date DATE,
    Customer_id INT
);

CREATE TABLE DimStore (
    Store_id INT PRIMARY KEY,
    City_id INT,
    Phone VARCHAR(20)
);

CREATE TABLE DimCity (
    City_id INT PRIMARY KEY,
    City_name VARCHAR(255),
    Headquarter_addr VARCHAR(255),
    State VARCHAR(255)
);

CREATE TABLE DimTime (
    Time_id INT PRIMARY KEY,
    Time DATETIME
);

CREATE TABLE FactSales (
    Order_no INT,
    Item_id INT,
    Store_id INT,
    Time_id INT,
    Quantity_ordered INT,
    Ordered_price DECIMAL(10, 2),
    FOREIGN KEY (Order_no) REFERENCES DimOrder(Order_no),
    FOREIGN KEY (Item_id) REFERENCES DimItem(Item_id),
    FOREIGN KEY (Store_id) REFERENCES DimStore(Store_id),
    FOREIGN KEY (Time_id) REFERENCES DimTime(Time_id)
);