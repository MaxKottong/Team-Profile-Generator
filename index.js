const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');

var manager;
var employees = [];

function generateHtml() {

    var employeeHtml = employees.forEach(employee => employee.generateHtml());

    return `
<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <title>Team Portfolio Generator</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./dist/style.css" />
</head>
<body>
    <div>` + employeeHtml + `</div>
</body>
</html>
`
}

function addEmployee(role, id) {

    //Ask all employee only questions
    var name;
    inquirer
        .prompt({
            name: 'What is the name?',
            id: 'What is the id?',
            email: 'What is the email?',
            github: 'What is the github?'
        })
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
                    message: 'What is their school?'
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