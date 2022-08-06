class Employee {
    constructor(name, id, email) {        
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }

    generateHtml() {
        var header = '<span>' + this.getName() + '</span><br><span>' + this.getRole() + '</span>';
        var properties = '<div>' + this.getId() + '</div>' + '<div>' + this.getEmail() + '</div>';
        var parentDiv = '<div>' + header + properties + '</div>';

        return parentDiv;
    }
}

module.exports = Employee;