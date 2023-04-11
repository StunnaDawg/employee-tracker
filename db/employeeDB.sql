DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
  id INT NOT NULL,
  
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id),
  REFERENCES roleNames(id),
  manager_id INT,
  FOREIGN KEY (employees),
  REFERENCES employees(id)
);