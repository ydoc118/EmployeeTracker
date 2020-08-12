//Installed packages
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");


//Setting up the connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "employee_trackerDB"
});

//Connecting to the server
connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected as id " + connection.threadId);
});

//Function to prefill employee list
function start() {
    connection.query(`SELECT role.title, employee.first_name, employee.last_name, department.deptName, role.salary
        FROM role
        INNER JOIN employee
        ON employee.role_id = role.id
        INNER JOIN department
        ON department.id = role.department_id AND role.id = employee.role_id
        ORDER BY role.id;`, (err, res) => {
    if(err) throw err;
    console.table(res);
});
};

start();





