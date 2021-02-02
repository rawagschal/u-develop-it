const db = require('./db/index');
const inquirer = require('inquirer');

const menuOptions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu_options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then(answers => {
        if('View all employees' === answers.menu_options){
            db.viewAllEmployees().then(menuOptions);
        } else {
            menuOptions();
        }
    })
};

menuOptions();
