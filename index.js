const db = require('./db/index');
const { prompt } = require('inquirer');
require("console.table");

const menuOptions = () => {
    prompt([
        {
            type: 'list',
            name: 'menu_options',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS'
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Add a role',
                    value: 'ADD_ROLE'
                },
                {
                    name: 'Add an employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Update an employee role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
            ]
        }
    ]).then(res => {
        let select = res.menu_options;
        
        switch (select) {
            case 'VIEW_DEPARTMENTS':
                console.log("=======================");
                console.log("VIEWING ALL DEPARTMENTS");
                console.log("=======================");
                viewAllDepartments();
                break;
            case 'VIEW_ROLES':
                console.log("=======================");
                console.log("VIEWING ALL ROLES");
                console.log("=======================");
                viewAllRoles();
                break;
            case 'VIEW_EMPLOYEES':
                console.log("=======================");
                console.log("VIEWING ALL EMPLOYEES");
                console.log("=======================");
                viewAllEmployees();
                break;
            case 'VIEW_EMPLOYEES':
                console.log("=======================");
                console.log("VIEWING ALL EMPLOYEES");
                console.log("=======================");
                viewAllEmployees();
                break;
            case 'ADD_DEPARTMENT':
                console.log("=======================");
                console.log("ADDING A DEPARTMENT");
                console.log("=======================");
                addDepartment();
                break;
            case 'ADD_ROLE':
                console.log("=======================");
                console.log("ADDING A ROLE");
                console.log("=======================");
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                console.log("=======================");
                console.log("ADDING AN EMPLOYEE");
                console.log("=======================");
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                console.log("=======================");
                console.log("UPDATING AN EMPLOYEE");
                console.log("=======================");
                updateEmployee();
                break;
            default:
                console.log("BYE");
        }
    })
};

function viewAllDepartments() {
    db.getAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.table(departments)
    })
    .then(() => menuOptions());
}

function viewAllRoles() {
    db.getAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.table(roles)
    })
    .then(() => menuOptions());
}

function viewAllEmployees() {
    db.getAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.table(employees)
    })
    .then(() => menuOptions());
}

function addDepartment() {
    prompt([
        {
            name: 'name',
            message: 'What is the department name?'
        }
    ]).then(res => {
        let name = res;
        db.createDepartment(name)
        .then(() => console.log("==============================="))
        .then(() => console.log(`${name.name} department created`))
        .then(() => console.log("==============================="))
        .then(() => menuOptions());
    })
}

function addRole() {
    db.getAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentOptions = departments.map(({ dept_id, department }) => ({
            name: department,
            value: dept_id
        }));
        prompt([
            {
                name: "title",
                message: "What is the role title?"
            },
            {
                name: "salary",
                message: "What is the role salary?"
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does this role belong to?",
                choices: departmentOptions
            }
        ]).then(role => {
            db.createRole(role)
            .then(() => console.log("==============================="))
            .then(() => console.log(`The ${role.title} has been created.`))
            .then(() => console.log("==============================="))
            .then(() => menuOptions());
        })
    })
}

function addEmployee() {
    prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        },
    ]).then(res => {
        let first = res.first_name;
        let last = res.last_name;

        db.getAllRoles()
            .then(([rows]) => {
                let roles = rows;
                const roleOptions = roles.map(({ role_id, role }) => ({
                    name: role,
                    value: role_id
                }));
                prompt ({
                    type: "list",
                    name: "role_id",
                    message: "What is the employee's role?",
                    choices: roleOptions
                }).then(res => {
                    let roleId = res.role_id;

                    db.getAllEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managerOptions = employees.map(({ employee_id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: employee_id
                            }));
                            // option for no manager
                            managerOptions.unshift({ name: "N/A", value: null});

                            prompt ({
                                type: "list",
                                name: "manager_id",
                                message: "Who is the employee's manager?",
                                choices: managerOptions
                            }).then(res => {
                                let employee = {
                                    manager_id: res.manager_id,
                                    role_id: roleId,
                                    first_name: first,
                                    last_name: last
                                }

                                db.createEmployee(employee);
                            })
                            .then(() => console.log("==============================="))
                            .then(() => console.log(`${first} ${last} has been added to the database.`))
                            .then(() => console.log("==============================="))
                            .then(() => menuOptions());
                        })
                })
            })
    })
}

function updateEmployee() {
    db.getAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeOptions = employees.map(({ employee_id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: employee_id
            }));

            prompt([
                {
                    type: "list",
                    name: "employee_id",
                    message: "Which employee would you like to update?",
                    choices: employeeOptions
                }
            ])
            .then(res => {
                let employeeId = res.employee_id;
                db.getAllRoles()
                    .then(([rows]) => {
                        let roles = rows;
                        const roleOptions = roles.map(({ role_id, role }) => ({
                            name: role,
                            value: role_id
                        }));

                        prompt([
                            {
                                type: "list",
                                name: "role_id",
                                message: "Which role will the employee be taking?",
                                choices: roleOptions
                            }
                        ])
                        .then(res => db.updateEmployeeRole(employeeId, res.role_id))
                        .then(() => console.log("==============================="))
                        .then(() => console.log(`Employee has been updated.`))
                        .then(() => console.log("==============================="))
                        .then(() => menuOptions());
                        
                    });
            });
        })
}

menuOptions();
