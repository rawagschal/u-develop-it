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
            default:
                console.log("BYE");
        }
       
        // else if('View all employees' === answers.menu_options){
        //     db.viewAllEmployees().then(menuOptions);
        // } else if('View all roles' === answers.menu_options){
        //     db.viewAllRoles().then(menuOptions);
        // } else if(' Adda department' === answers.menu_options){
        //     db.addDepartmentOptions().then(menuOptions);
        // }
        
        // 
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


menuOptions();
