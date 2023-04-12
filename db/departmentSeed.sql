-- Insert into departmentNames
INSERT INTO departmentNames (department_name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

-- Insert into roleNames
INSERT INTO roleNames (id, title_name, salary, department_id)
VALUES  (1, 'Sales Person', 70000, 4), 
        (2, 'Lead Engineer', 150000, 1), 
        (3, 'Legal Team Lead', 200000, 3), 
        (4, 'Sales Lead', 100000, 4), 
        (5, 'Accountant', 110000, 3),
        (6, 'Engineer', 100000, 1);

-- Insert into employees
-- Insert manager rows and retrieve their employee_id values
INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Charlie', 'Allenski', 2),
       ('Meji', 'Woo', 4),
       ('Sansa', 'Stark', 3);

-- Assuming employee_id of the newly inserted managers are 1, 2, and 3 respectively
SET @charlie_id = LAST_INSERT_ID();
SET @meji_id = LAST_INSERT_ID();
SET @sansa_id = LAST_INSERT_ID();

-- Insert employee rows with manager_id
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Marty', 'King', 5, @meji_id),
       ('Kenny', 'Spenny', 6, @charlie_id),
       ('Shohei', 'Ohtani', 1, @meji_id);
