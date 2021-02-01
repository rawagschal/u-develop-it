DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE Department (
    id 
        INT 
        AUTO_INCREMENT 
        PRIMARY KEY,
    name 
        VARCHAR(30) 
        UNIQUE 
        NOT NULL
);

CREATE TABLE Role (
    id
        INT 
        AUTO_INCREMENT
        PRIMARY KEY,
    title
        VARCHAR(30)
        UNIQUE
        NOT NULL,
    salary
        DECIMAL
        NOT NULL,
    department_id
        INT
        NOT NULL,
    
)