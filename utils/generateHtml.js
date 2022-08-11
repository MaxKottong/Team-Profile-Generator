function generateCard(employee) {

    let additionalInfo = '';
    let iconInfo = '';
    let email = employee.getEmail();
    let role = employee.getRole();

    switch (role) {
        case "Manager":
            iconInfo = `oi-briefcase`;
            additionalInfo = `<p class="card-text">Office Number: ${employee.getOfficeNumber()}</p>`;
            break;
        case "Engineer":
            iconInfo = `oi-wrench`;
            github = employee.getGithub();
            additionalInfo = `<p class="card-text">Github: <a href="https://github.com/${github}" target="_blank">${github}</a></p>`;
            break;
        case "Intern":
            iconInfo = `oi-book`;
            additionalInfo = `<p class="card-text">School: ${employee.getSchool()}</p>`;
            break;
    }

    let card = `
        <div class="card mt-10 shadow" style="width: 18rem;">
        <div class="card-img-top bg-warning">
            <h3 class="p-10">${employee.getName()}</h3>
            <h5 class="p-10"><span class="oi ${iconInfo}"></span>  ${role}</h5>
        </div>
        <div class="card-body">
            <p class="card-text">ID: ${employee.getId()}</p>
            <p class="card-text">Email: <a href="mailto:${email}">${email}</a><p>
            ${additionalInfo}
        </div>
        </div>`;

    return card;
}

function generateHtml(employees) {

    let employeeCards = '';

    employees.forEach(employee => employeeCards += generateCard(employee));

    let html =  `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css" integrity="sha512-UyNhw5RNpQaCai2EdC+Js0QL4RlVmiq41DkmCJsRV3ZxipG2L0HhTqIf/H9Hp8ez2EnFlkBnjRGJU2stW3Lj+w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<!--Will need to be updated to best practice path-->
    <link rel="stylesheet" href="./style.css" />
    <title>Get to know your Team!</title>
</head>
<body>
    <header class="container-fluid bg-info h-25">
        <h1 class="text-light text-center">Meet our Team!</h1>
    </header>
    <main class="container mt-10 p-10 d-flex flex-wrap justify-content-sm-center">
        ${employeeCards}
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
</body>
</html>    
    `;

    return html;
}

module.exports = generateHtml;