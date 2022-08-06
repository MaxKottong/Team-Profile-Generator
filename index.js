const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');

function generateHtml() {
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
    Hello There
</body>
</html>
`
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
    new Employee()
}

init();