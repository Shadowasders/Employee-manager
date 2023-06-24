    DROP DATABASE IF EXISTS company_db;
    CREATE DATABASE company_db;
    USE company_db;

    CREATE TABLE departments (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL, 
        PRIMARY KEY (id)
    );

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    departments_id INT NOT NULL,
    salary INT NOT NULL
    FOREIGN KEY (departments_id)
    REFERENCES departments(id)
);

    CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(100)
);