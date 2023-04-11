INSERT INTO departmentNames (id, department_name)
VALUES (001, "Engineering"),
       (002, "Finance"),
       (003, "Legal"),
       (004, "Sales");

INSERT INTO roleNames (id, department_id, title_name, salary)
VALUES  (001, 004, 'Sales Person', 70000), 
        (005, 001, 'Lead Engineer', 150000), 
        (003, 003, 'Legal Team Lead', 200000), 
        (004, 004, 'Sales Lead', 100000), 
        (002, 003, 'Accountant', 110000),
        (006, 001, 'Engineer', 100000);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES  (001, 'Marty', 'King', 005),
        (002, 'Kenny', 'Spenny', 006),
        (003, 'Charlie', 'Allenski', 002),
        (004, 'Shohei', 'Ohtani', 001),
        (005, 'Meji', 'Woo', 004),
        (006, 'Sansa', 'Stark', 003);