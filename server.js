//TODO: use map to figure out how to map departments to ids. Use that for employee roles, and for updates. Also write return to start function to reset app


require('dotenv').config()
const fs = require('fs');
const inquirer = require('inquirer');
const { table } = require('console');
// const { addRole, depMap } = require('./lib/index'); 
const connection = require('./connection.js');

// db.viewRoles()
const menuList = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee information", "Exit"]
const interface = [
    {
        type: 'list',
        name: 'menu',
        message: 'Welcome! Please choose from the following options',
        choices: menuList,
    },
]

function init() {
    inquirer.prompt(interface)
        .then(answers => {
            // console.log(answers);
            switch (answers.menu) {
                case "View all departments":
                    viewDepartments()
                    break;
                case "View all roles":
                    viewRoles()
                    break;
                case "View all employees":
                    viewEmployees()
                    break;
                case "Add a department":
                    addDepartment()
                    break;
                case "Add a role":
                    addRole()
                    break;
                case "Add an employee":
                    addEmp()
                    //more to be added
                    break;
                case "Update employee information":
                    updateEmployee()
                    break;
                case "Exit":
                    console.log("Thank you for using the database")
                    process.exit(0);
                default:
                    console.log("Please select from the avaible options")
            }
        })
}
function addRole() {
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
                connection.query(`INSERT INTO ROLES ( name, departments_id, salary) VALUES("${depRName}", "${depId}","${depMoney}")`, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.table(`added: ${depRName}`, res);
                })
            }).then(() => {
                console.log("The database has been updated"),
                    init();
            })
        }
    )
}

function addEmp() {
    return connection.query(
        `SELECT * FROM ROLES`, function (err, res) {
            if (err) {
                console.log(err);
                return init();
            }
            const roleChoices = res.map(role => ({
                value: role.id,
                name: role.name
            }))
            inquirer.prompt([
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
                    type: 'list',
                    name: 'role',
                    message: 'What is this employees role?',
                    choices: roleChoices
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
            ]).then((answers) => {
                let empName = answers.first_name
                let empLast = answers.last_name
                let role = answers.role
                let empSalary = answers.salary
                let empManager = answers.manager
                connection.query(`INSERT INTO EMPLOYEES ( first_name, last_name, role, salary, manager) VALUES("${empName}", "${empLast}", "${role}", "${empSalary}", "${empManager}")`, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("The employee has been added"),
                        init();
                })
            })
        }
    )
}


function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the new department?"
        }
    ]).then((answers) => {
            let newDep = answers.name
            connection.query(`INSERT INTO departments (name) VALUES("${newDep}")`, function(err, res){
                if(err){
                    console.log(err);
                }
                console.log("Department added");
                init()
            })
        })
}

function viewDepartments() {
    connection.promise().query(
        `SELECT * FROM departments`,
    ).then(([results]) => {
        console.table(results),
            init();
    }).catch(err => {
        console.log(err);
    })

}

function viewEmployees() {
    connection.promise().query(
        `SELECT * FROM employees`,
    ).then(([results]) => {
        console.table(results),
            init();
    }).catch(err => {
        console.log(err);
    })

}

function viewRoles() {
    connection.promise().query(
        `SELECT * FROM roles`,
    ).then(([results]) => {
        console.table(results),
            init();
    }).catch(err => {
        console.log(err);
    })
}

function updateEmployee() {
    return connection.query(`SELECT * FROM EMPLOYEES`, function (err, res) {
        if (err) {
            console.log(err);
            return init();
        }
        const currentEmp = res.map(employee => ({
            value: employee.id,
            name: `${employee.first_name}${employee.last_name}`
        }))
        inquirer.prompt([
            {
                type: 'list',
                name: 'empchoice',
                message: 'Select an employee to update',
                choices: currentEmp
            },
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the new first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the new last name?"
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the new salary?"
            }
        ]).then((answers) => {
            let chosenEmp = answers.empchoice
            let newEmpName = answers.first_name
            let newEmpLast = answers.last_name
            let newSal = answers.salary
            connection.query(`UPDATE EMPLOYEES SET first_name = "${newEmpName}", last_name = "${newEmpLast}", salary = "${newSal}" WHERE id = "${chosenEmp}"`, function (err, res) {
                if (err) {
                    console.log(err);
                }
                console.log("The employee information has been updated"),
                    init();
            })
        })
    })

}
init();

