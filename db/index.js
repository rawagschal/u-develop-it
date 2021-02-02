const connection = require('./connection');
const table = require('console.table');

const viewAllEmployees = function() {
    return connection.promise().query(
        `SELECT employee.id AS 'employee id', employee.first_name AS 'employee first name', employee.last_name AS 'employee last name',
        department.name AS 'department name', role.title AS 'employee role', role.salary AS 'salary',
        concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee AS manager
        ON employee.manager_id = manager.id;
        `)
        .then(([rows]) => {
           console.table('Viewing all employees', rows);
        }) 
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    viewAllEmployees,
};