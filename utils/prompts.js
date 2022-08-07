const inquirer = require("inquirer")
const emailValidator = require('email-validator');

const addManager = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is your name?",
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
                message: "What is your employee ID?"
            },
            {
                type: 'input',
                name: 'email',
                message: "What is your email address?",
                validate: emailInput => {
                    if (emailValidator.validate(emailInput)) {
                        return true;
                    }
                    else {
                        console.log('Please enter a valid email address');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?'
            }
        ])
        .then(employeeData => {
            employeeData['role'] = 'Manager';
            return employeeData;
        })
}

const addEmployee = (employees=[]) => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the employee's name?"
            },
            {
                type: 'list',
                name: 'role',
                choices: ['Engineer', 'Intern'],
                message: "What is the employee's role",
            },
            {
                type: 'input',
                name: 'id',
                message: `What is the employee's ID`
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employee's email address",
                validate: userInput => {
                    if (!userInput.includes('@')) {
                        console.log('You must enter a valid email address');
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'github',
                message: "Enter the engineer's github username",
                when: ({ teamMemberRole }) => (teamMemberRole === 'Engineer') ? true : false,
                validate: input => {
                    if (!input) {
                        console.log('You must enter a github username')
                        return false;
                    }
                    return true;
                }
            },
            {
                type: 'input',
                name: 'school',
                message: 'What school does the intern attend?',
                when: ({ teamMemberRole }) => (teamMemberRole === 'Intern') ? true : false,
                validate: input => {
                    if (!input) {
                        console.log('You must enter a school for your intern')
                        return false;
                    }
                    return true;
                }

            },
            {
                type: 'confirm',
                name: 'addMember',
                message: 'Would you like to add another team member?',
                default: false
            }
        ])
        .then(employeeData => {
            employees.push(employeeData);
            return employeeData.addMember ? addEmployee(employees) : employees;
        })
}

module.exports = { addManager, addEmployee };