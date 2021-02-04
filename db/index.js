//mysql database file
const connection = require('./connection');

class database {
    // hold reference to mysql connection
    constructor(connection) {
        this.connection = connection;
    }
    getAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id AS 'dept_id', department.name AS 'department' FROM department;"
        );
    }
    getAllRoles() {
        return this.connection.promise().query(
            "SELECT role.id AS 'role_id', role.title AS 'role', department.name AS 'department', role.salary AS 'salary' FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    }
    getAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id AS 'employee id', employee.first_name AS 'first name', employee.last_name AS 'last name', department.name AS 'department', role.title AS 'role', role.salary AS 'salary', concat(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id"
        );
    }
    createDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", department
        );
    }
    createRole(role) { 
        return this.connection.promise().query(
            "INSERT INTO role SET ?", role
        );
    }

}


// const viewAllEmployees = function() {
//     return connection.promise().query(
//         `;
//         `)
//         .then(([rows]) => {
//            console.table('Viewing all employees', rows);
//         }) 
//         .catch(err => {
//             console.log(err);
//         });
// };

// const addDepartment = function(name) {
//     const sql = `INSERT INTO department (dept_name) VALUES (?)`;
//     return connection.promise().query(sql, name)
//     .then(([results]) => {
//         console.log('\n', 'Added department:', name, '\n');
//     })
//     .then(viewAllDepartments)
//     .catch(err => {
//         console.log(err);
//     });
// };

// module.exports = {
//     viewAllDepartments,
//     viewAllRoles,
//     viewAllEmployees,
//     addDepartment,
// };

module.exports = new database(connection);