const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3030,
    user: "root",
    password: "yourRootPassword",
    database: "employee_trackerDB"
});

connection.connect(err => {
    if(err) throw err;
    console.log("Connected as id " + connection.threadId);
    
})