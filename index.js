const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { addManager, addEmployee } = require('./utils/prompts');
const generateHtml = require('./utils/generateHtml');
const fs = require('fs');

addManager()
    .then(managerData => addEmployee([managerData]))
    .then(employees => {
        return generateHtml(employees);
    })
    .then(html => {
        fs.writeFile('./dist/index.html', html, err => {
            if (err) {
                console.log('Error: ', err)
                return;
            }
            return;
        })
    })
    .then(() => {
        console.log("Your completed page is available in the ./dist directory.");
    })