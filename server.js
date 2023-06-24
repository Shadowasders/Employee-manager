require('dotenv').config() 
const fs = require('fs');
const inquirer = require('inquirer');
const db = require("./lib/index");

// db.viewRoles()
const menuList = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee information"]
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
    .then (answers => {
        console.log(answers);
        switch(answers.menu){
            case "View all departments":
            const dpts = db.viewDepartments()
            console.table(dpts);
        }
    })
}

init();
