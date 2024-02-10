create database as4;
use as4;

-- Create a table for the QuestionBank
-- The table will have the following columns:
CREATE TABLE QuestionBank (
    id INT AUTO_INCREMENT,
    question TEXT NOT NULL,
    image BLOB,
    answer TEXT,
    options JSON,
    PRIMARY KEY (id)
);

-- Create a table for the Teacher
-- The table will have the following columns:
CREATE TABLE Teacher (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Create a table for the Student
-- The table will have the following columns:
CREATE TABLE Student (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Create a table for the Test
-- The table will have the following columns:
CREATE TABLE Test (
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    questions JSON,
    PRIMARY KEY (id)
);

-- Create a table for the TestResult
-- The table will have the following columns:
CREATE TABLE TestResult (
    id INT AUTO_INCREMENT,
    student_id INT NOT NULL,
    test_id INT NOT NULL,
    score INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (test_id) REFERENCES Test(id)
);

-- Create a table for the TestAssignment
-- The table will have the following columns:
CREATE TABLE TestAssignment (
    id INT AUTO_INCREMENT,
    teacher_id INT NOT NULL,
    test_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id),
    FOREIGN KEY (test_id) REFERENCES Test(id)
);



