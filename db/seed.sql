USE employees;

INSERT INTO department (name)
VALUES 
    ('Executive Level'),
    ('Sales'),
    ('Legal'),
    ('HR'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 500000, 1),
    ('CLO', 400000, 1),
    ('CFO', 400000, 1),
    ('Sales Lead', 200000, 2),
    ('Sales Manager', 150000, 2),
    ('Sales Assistant', 100000, 2),
    ('Lawyer', 200000, 3),
    ('Legal Assistant', 100000, 3),
    ('Head of HR', 200000, 4),
    ('HR Manager', 150000, 4),
    ('HR Assistant', 100000, 4),
    ('Lead Accountant', 200000, 5),
    ('Accounting Manager', 150000, 5),
    ('Accounting Assitant', 100000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Rachel', 'Wagschal', 1, NULL), 
    ('Incredible', 'Lawyer', 2, 1);

    
