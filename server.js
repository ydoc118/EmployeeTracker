//Installed packages
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const Employee = require("./classes/employee");
const Role = require("./classes/role");
const Department = require("./classes/department");

let departments = [];
let titles = [];
let empArray = [];
let listEmps = [];
const questionInit = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "firstQuestion",
        choices: [
            "Add Employee",
            "Add Title",
            "Add Department",
            "View Employees by Department",
            "View Employees by Title",
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

//
connection.query(`SELECT * FROM department`, (err, res) => {
    if(err) throw err;
    
    for(var i = 0; i < res.length; i++){
        departments.push(res[i].deptName)
    };

});

//
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
        ON department.deptName = role.department_id AND role.id = employee.role_id
        ORDER BY role.id;`, (err, res) => {
        if(err) throw err;
        console.table(res);
        
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
                    }
                ]).then(response => {
                    var newEmployee = new Employee(response.title, response.firstName, response.lastName, response.dept, response.salary);
                    empArray.push(newEmployee);
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
                },
                {
                    type: "input",
                    message: "What is their Salary?",
                    name: "Salary"
                },
                {
                    type: "list",
                    message: "Into which department?",
                    name: "titleDepartment",
                    choices: departments
                }
            ]).then(response => {
                console.log(response.Title)
                var newEmpTitle = new Role(response.Title);
                titles.push(newEmpTitle.title)
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.Title, response.Salary, response.titleDepartment], (err, res) => {
                    if(err) throw err;
                    console.table(titles)
                    start();
                });
                
                
            })
        }
        else if(response.firstQuestion === "Add Department") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What department would you like to add?",
                    name: "addDept"
                }
            ]).then(response => {
                var newEmpDept = new Department(response.addDept);
                departments.push(newEmpDept.deptName)
                console.table(departments)
                start();
            })
        }
        else if(response.firstQuestion === "View Employees by Department") {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which department would you like to choose?",
                    name: "seeDepts",
                    choices: departments
                }
            ]).then(response => {
               connection.query(`SELECT role.title, employee.first_name, employee.last_name, department.deptName FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.deptName = role.department_id WHERE department.deptName = ?`, [response.seeDepts], (err,res) => {
                    if(err) throw err;
                    console.table(res);
                    start();
                }) 
            })
            
        }
        else if(response.firstQuestion === "View Employees by Title") {
            inquirer.prompt([
                {
                    type: "list",
                    message: "Which title would you like to choose?",
                    name: "seeTitles",
                    choices: titles
                }
            ]).then(response => {
                connection.query(`SELECT role.title, employee.first_name, employee.last_name, role.department_id, role.salary FROM role INNER JOIN employee ON employee.role_id = role.id WHERE role.title = ?`, [response.seeTitles], (err, res) => {
                    if(err) throw err;
                    console.table(res);
                    start();
                });
            });
        }
        else if(response.firstQuestion === "Exit") {
            connection.end();
        }
        





    })
}


init();





