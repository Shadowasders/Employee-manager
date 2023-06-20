    DROP DATABASE IF EXISTS company_db;
    CREATE DATABASE company_db_db;
    USE company_db;

    CREATE TABLE departments (
        id INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL 
    );

    CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(100), NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary INT NOT NULL,
);