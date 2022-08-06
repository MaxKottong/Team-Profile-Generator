const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');
const emailValidator = require('email-validator');

var manager;
var employees = [];

function addManager() {

}

function addEmployee(role, id) {

    //Ask all employee only questions
    var name;
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the employee's name?",
                validate: nameInput => {
                    if (!nameInput) {
                        console.log("Please enter an employee's name")
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the employee's ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employee's email?",
                validate: emailInput => {
                    if (emailValidator.validate(emailInput)) {
                        return true;
                    }
                    else {
                        console.log('Please enter a valid email address');
                        return false;
                    }
                }
            }
        ])
        .then(({ nameVar }) => {
            name = nameVar;
        });

    var email;
    //Ask email inquirer

    var employee;

    //Ask role based questions
    switch (role) {
        case 'Engineer':
            inquirer
                .prompt({
                    type: 'input',
                    name: 'github',
                    message: 'What is their GitHub username?'
                })
                .then(({ github }) => {
                    employee = new Engineer(name, id, email, github);
                });
            break;
        case 'Intern':
            inquirer
                .prompt({
                    type: 'input',
                    name: 'school',
                    message: 'What is the interns school?'
                })
                .then(({ school }) => {
                    employee = new Intern(name, id, email, school);
                });
            break;
    }

    employees.push(employee);
}

function writeToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('index.html', err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'HTML page created'
            });
        });
    });
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