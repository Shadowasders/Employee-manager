//TODO: use map to figure out how to map departments to ids. Use that for employee roles, and for updates. Also write return to start function to reset app


require('dotenv').config()
const fs = require('fs');
const inquirer = require('inquirer');
const db = require("./lib/index");
const { table } = require('console');
// const { addRole, depMap } = require('./lib/index'); 
const connection = require('./connection.js');

// db.viewRoles()
const menuList = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee information", "quit"]
const interface = [
    {
        type: 'list',
        name: 'menu',
        message: 'Welcome! Please choose from the following options',
        choices: menuList,
    },
]

const addDep = [
    {
        type: 'input',
        name: 'name',
        message: "What is the name of the new department?"
    }
]

const newRole = [
    // {
    //     type: 'input',
    //     name: 'name',
    //     message: "What is the role you would like to add?"
    // },
    // {
    //     type: 'list',
    //     name: 'departments_id',
    //     message: "What department is this role in?",
    //     choices: depMap
    // },
    // {
    //     type: 'input',
    //     name: 'salary',
    //     message: "What is this roles salary"
    // }
]

const addEmp = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
    },
    {
        type: 'input',
        name: 'role',
        message: 'What is this employees role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is this employee's salary?"
    },
    {
        type: 'input',
        name: 'manager',
        message: "Who is the employees manager? (If appliable)"
    }
]

function init() {
    inquirer.prompt(interface)
        .then(answers => {
            console.log(answers);
            switch (answers.menu) {
                case "View all departments":
                    db.viewDepartments()
                    break;
                case "View all roles":
                    db.viewRoles()
                    break;
                case "View all employees":
                    db.viewEmployees()
                    break;
                case "Add a department":
                    inquirer.prompt(addDep)
                        .then(answers => {
                            console.log(answers)
                            db.addDepartment(answers)
                                .then(() => {
                                    console.log("The database has been updated");
                                    return init();
                                })
                        })
                    break;
                case "Add a role":
                    addRole()
                    // inquirer.prompt(newRole)
                        // .then(answers => {
                        //     console.log(answers.addRole)
                        //     let depRName = answers.name
                        //     let depId = answers.departments_id 
                        //     let depMoney = answers.salary
                        //     connection.query(`INSERT INTO ROLE SET ? ( name, departments_id, salary) VALUES("${depRName}", "${depId}","${depMoney}")`, function(err, res) {
                        //         if (err) {
                        //             console.log(err);
                        //         }
                        //         console.table(`added: ${depRName}`, res),
                        //         init();
                        //     })
                        // }).then(() => {
                        //     console.log("The database has been updated");
                        //     return init();
                        // })
                    break;
                case "Add an employee":
                    inquirer.prompt(addEmp)
                    //more to be added
                    break;
                case "Update employee information":
                    //more to be added
                    break;
                case "quit":
                    console.log("Thank you for using the database")
                    process.exit(0);
                default:
                    console.log("Please select from the avaible options")
            }
        })
}
function addRole() {
        console.log("This will add a role");
        return connection.query(
            `SELECT * FROM DEPARTMENTS`, function (err, res) {
                if (err) {
                    console.log(err)
                    return init();
                }
                const depMap = res.map(department => ({
                    value: department.id,
                    name: department.name
                }))
                console.log(depMap)
               inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "What is the role you would like to add?"
                },
                {
                    type: 'list',
                    name: 'departments_id',
                    message: "What department is this role in?",
                    choices: depMap
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: "What is this roles salary"
                }
               ]).then(answers => {
                console.log(answers.addRole)
                let depRName = answers.name
                let depId = answers.departments_id 
                let depMoney = answers.salary
                connection.query(`INSERT INTO ROLES ( name, departments_id, salary) VALUES("${depRName}", "${depId}","${depMoney}")`, function(err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.table(`added: ${depRName}`, res),
                    init();
                })
            }).then(() => {
                console.log("The database has been updated");
                return init();
            })
            }
        )
    }
init();
