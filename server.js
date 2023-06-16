const fs = require('fs');
const inquirer = require('inquirer');



const interface = [
    {
        type: 'list',
        name: 'mainmenu',
        message: 'Please choose from the following options',
        choices: menuList,
    }
]

function init() {
    inquirer.createPromptModule(interface);
}