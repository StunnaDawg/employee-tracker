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
INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Marty', 'King', 5),
        ('Kenny', 'Spenny', 6),
        ('Charlie', 'Allenski', 2),
        ('Shohei', 'Ohtani', 1),
        ('Meji', 'Woo', 4),
        ('Sansa', 'Stark', 3);