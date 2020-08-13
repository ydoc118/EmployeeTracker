class Employee {
    constructor(title, first_name, last_name, deptName, salary){
        this.title = title;
        this.first_name = first_name;
        this.last_name = last_name;
        this.deptName = deptName;
        this.salary = salary;
    };

    setNewEmployee() {
        connection.query("INSERT INTO employee (first_name, last_name) VALUES (?,?)", [this.first_name, this.last_name])
        connection.query("INSERT INTO department (deptName) VALUES (?)", [this.deptName])
        connection.query("INSERT INTO role (title, salary) VALUES (?,?)", [this.title, this.salary])
    };
};

module.exports = Employee;