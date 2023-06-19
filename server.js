const fs = require('fs');
const inquirer = require('inquirer');

const menuList = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee information"]

const interface = [
    {
        type: 'list',
        name: 'mainmenu',
        message: 'Welcome! Please choose from the following options',
        choices: menuList,
    }
]

function init() {
    inquirer.createPromptModule(interface);
}

init();