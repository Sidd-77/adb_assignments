--a
CREATE TYPE name_type AS (
    name VARCHAR(50)
);

CREATE TABLE object_table OF name_type;

INSERT INTO object_table(name) VALUES ('John Doe'), ('Jane Smith'), ('John Jacob Jingleheimer Schmidt');

CREATE OR REPLACE FUNCTION countNoOfWords(n name_type) RETURNS INTEGER AS $$
BEGIN
    RETURN array_length(regexp_split_to_array(n.name, E'\\s+'), 1);
END;
$$ LANGUAGE plpgsql;

SELECT name, countNoOfWords(row(object_table.*)) as word_count FROM object_table;

--b
CREATE TYPE address_type AS (
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    pincode VARCHAR(10)
);

CREATE TABLE address_table OF address_type;

INSERT INTO address_table(address, city, state, pincode) 
VALUES ('123 Main St', 'New York', 'NY', '10001'),
       ('456 Elm St', 'Los Angeles', 'CA', '90001'),
       ('789 Oak St', 'Chicago', 'IL', '60601');

CREATE OR REPLACE FUNCTION extractAddresses(a address_type, keyword VARCHAR(50)) RETURNS BOOLEAN AS $$
BEGIN
    RETURN a.address ILIKE '%' || keyword || '%' OR
           a.city ILIKE '%' || keyword || '%' OR
           a.state ILIKE '%' || keyword || '%' OR
           a.pincode ILIKE '%' || keyword || '%';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION countWordsInField(a address_type, field_name VARCHAR(50)) RETURNS INTEGER AS $$
BEGIN
    CASE field_name
        WHEN 'address' THEN RETURN array_length(regexp_split_to_array(a.address, E'\\s+'), 1);
        WHEN 'city' THEN RETURN array_length(regexp_split_to_array(a.city, E'\\s+'), 1);
        WHEN 'state' THEN RETURN array_length(regexp_split_to_array(a.state, E'\\s+'), 1);
        WHEN 'pincode' THEN RETURN array_length(regexp_split_to_array(a.pincode, E'\\s+'), 1);
        ELSE RETURN NULL;
    END CASE;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM address_table WHERE extractAddresses(row(address_table.*), 'New York');
SELECT countWordsInField(row(address_table.*), 'address') as word_count FROM address_table;

--c
CREATE TYPE course_type AS (
    course_id INT,
    description VARCHAR(100)
);

CREATE TABLE course_table OF course_type;

INSERT INTO course_table(course_id, description) 
VALUES (1, 'Introduction to Computer Science'),
       (2, 'Data Structures and Algorithms'),
       (3, 'Database Systems'),
       (4, 'Software Engineering'),
       (5, 'Artificial Intelligence');

SELECT * FROM course_table;