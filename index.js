const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { addManager, addEmployee } = require('./utils/prompts');
const generateHtml = require('./utils/generateHtml');
const fs = require('fs');

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

init();