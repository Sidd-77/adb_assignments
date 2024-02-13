--for postgresDB

--a

CREATE TABLE test_table (
    RecordNumber NUMERIC(3),
    CurrentDate DATE
);

CREATE OR REPLACE FUNCTION insert_records() RETURNS VOID AS $$
BEGIN
    FOR i IN 1..50 LOOP
        INSERT INTO test_table(RecordNumber, CurrentDate) VALUES (i, CURRENT_DATE);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Call the function to insert the records
SELECT insert_records();

--b
CREATE TABLE products (
    ProductID NUMERIC(4),
    category CHAR(3),
    detail VARCHAR(30),
    price NUMERIC(10,2),
    stock NUMERIC(5)
);

INSERT INTO products(ProductID, category, detail, price, stock) 
VALUES (1, 'A', 'Product A', 100.00, 10),
       (2, 'B', 'Product B', 200.00, 20),
       (3, 'A', 'Product C', 300.00, 30),
       (4, 'B', 'Product D', 400.00, 40),
       (5, 'A', 'Product E', 500.00, 50);

CREATE OR REPLACE FUNCTION increase_price(X NUMERIC, Y CHAR(3)) RETURNS VOID AS $$
BEGIN
    UPDATE products SET price = price * (1 + X / 100) WHERE category = Y;
END;
$$ LANGUAGE plpgsql;

-- Call the function to increase the price by 10% for all products in category 'A'
SELECT increase_price(10, 'A');