const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log("Connected to the company database.")
    );
// const db = connection.connect((err) => {
//         console.log(err);
//         if (err) {
//             throw new Error(err)
//         } 
//         console.log("connected 2 new db");
//     })
    
function viewDepartments () {
    console.log("this is the department section")
    connection.promise().query(
        `SELECT * FROM departments`,
    ) .then (results => {
        console.log(results)
        return results
    }) .catch (err => {
        console.log(err);
    })
}

function viewEmployees () {
    console.log("this will view all the employees")
    connection.promise().query(
        `SELECT * FROM employees`,
    ) .then (results => {
        console.log(results);
        return results
    }) .catch (err => {
        console.log(err);
    })
}

function viewRoles () {
    console.log("this will view roles");
    connection.promise().query(
        `SELECT * FROM roles`,
    ) .then (results => {
        console.log(results);
        return results
    }) .catch (err => {
        console.log(err);
    })
}

function addDepartment(params = {}) {
    console.log("This will add a department");
}

function addRole(params = {}) {
    console.log("This will add a role");
}

function addEmployee(params = {}) {
    console.log("This will add an employee");
}

function updateEmployee(params = {}) {
    console.log("This will update an employees existing information");
}
module.exports = {
    viewDepartments,
    viewEmployees,
    viewRoles,
    addDepartment,
    addEmployee,
    addRole,
    updateEmployee
}
