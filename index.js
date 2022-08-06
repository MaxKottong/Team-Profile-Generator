const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { addManager, addEmployee } = require('./utils/prompts');
const fs = require('fs');

var employees = [];

addManager()
    .then(managerData => addEmployee([managerData]))
    .then(results => {

    })

function writeToFile() {
    fs.writeFile('./dist/index.html', html, err => {
        if (err) {
            console.log('Error: ', err)
            return;
        }
        return;
    })
};

function init() {
    addManager();

    for (var i = 2; i <= 10; i++) {
        inquirer
            .prompt({
                type: 'list',
                name: 'role',
                message: 'What type of employee would you like to add?',
                choices: ['Engineer', 'Intern', 'None']
            })
            .then(({ role }) => {
                if (role === 'None') {
                    return generateHtml();
                } else {
                    addEmployee(role, i);
                }
            })
    }
}

init();