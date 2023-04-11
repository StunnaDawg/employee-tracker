DROP DATABASE IF EXISTS role_db;
CREATE DATABASE role_db;

USE role_db;

CREATE TABLE roleNames (
  id INT PRIMARY KEY,
  department_id INT,
  title_name VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id),
  REFERENCES departmentNames(id)
);