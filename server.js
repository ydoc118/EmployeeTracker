//Installed packages
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const Employee = require("./classes/employee");
const Role = require("./classes/role");

let departments = [];
let titles = [];
let empArray = [];
const questionInit = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "firstQuestion",
        choices: [
            "Add Employee",
            "Add Title",
            "Add Department",
            "View all Employees",
            "View Employees by Department",
            "View Employees by Role",
            "Update Employee",
            "Exit"
        ]
    }
];


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

connection.query(`SELECT deptName FROM department`, (err, res) => {
    if(err) throw err;
    
    for(var i = 0; i < res.length; i++){
        departments.push(res[i].deptName)
    };

});

connection.query(`SELECT DISTINCT title FROM role`, (err, res) => {
    if(err) throw err;
    
    for(var i = 0; i < res.length; i++){
        titles.push(res[i].title)
    };

});

//Function to prefill employee list
function init() {
    connection.query(`SELECT role.title, employee.last_name, employee.first_name, department.deptName, role.salary
        FROM role
        INNER JOIN employee
        ON employee.role_id = role.id
        INNER JOIN department
        ON department.id = role.department_id AND role.id = employee.role_id
        ORDER BY role.id;`, (err, res) => {
        if(err) throw err;
        
        for(var i = 0; i < res.length; i++){
            empArray.push(res[i]); 
        }
        console.table(empArray);
        
    });
   setTimeout(function(){
       start();
   }, 100);
};

function start() {
    inquirer.prompt(questionInit)
    .then(response => {
        if(response.firstQuestion === "Add Employee"){
                
                inquirer.prompt([
                    {
                        type: "list",
                        message: "What department do they belong to?",
                        name: "dept",
                        choices: departments
                    },
                    {
                        type: "list",
                        message: "What is their title?",
                        name: "title",
                        choices: titles
                    },
                    {
                        type: "input",
                        message: "What is their first name?",
                        name: "firstName"
                    },
                    {
                        type: "input",
                        message: "What is their last name?",
                        name: "lastName"
                    },
                    {
                        type: "input",
                        message: "What is their salary?",
                        name: "salary"
                    }
                ]).then(response => {
                    var newEmployee = new Employee(response.title, response.firstName, response.lastName, response.dept, response.salary);
                    empArray.push(newEmployee)
                    console.table(empArray);
                    start();
                })
            
        }
        else if(response.firstQuestion === "Add Title") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What title would you like to add?",
                    name: "Title"
                }
            ]).then(response => {
                var newEmpTitle = new Role(response.Title);
                console.log(newEmpTitle.title)
                titles.push(newEmpTitle.title)
                console.table(titles)
                start();
            })
        }






    })
}


init();





