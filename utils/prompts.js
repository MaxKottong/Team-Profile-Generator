const inquirer = require("inquirer")
const emailValidator = require('email-validator');
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

const addManager = () => {
    console.log("Welcome to the team profile generator! Let's start with your name first manager!");
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
        .then(e => {
            e['role'] = 'Manager';
            let manager = new Manager(e.name, e.id, e.email, e.officeNumber);
            return manager;
        })
}

const addEmployee = (employees = []) => {
    console.log("Now please add as many employees to the team as you would like.");
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
                message: `What is the employee's ID?`
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employees email address?",
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
                name: 'github',
                message: "What is the engineer's github username",
                when: ({ role }) => (role === 'Engineer') ? true : false,
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
                when: ({ role }) => (role === 'Intern') ? true : false,
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
                name: 'isAddAnotherMember',
                message: 'Would you like to add another team member?',
                default: false
            }
        ])
        .then(e => {

            var employee;
            switch (e.role) {
                case 'Engineer':
                    employee = new Engineer(e.name, e.id, e.email, e.github);
                    break;
                case 'Intern':
                    employee = new Intern(e.name, e.id, e.email, e.school);
                    break;
            }

            employees.push(employee);
            return e.isAddAnotherMember ? addEmployee(employees) : employees;
        })
}

module.exports = { addManager, addEmployee };