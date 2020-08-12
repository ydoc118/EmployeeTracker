DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12, 2) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

INSERT INTO department (deptName)
VALUES ("Airfield Technician");

INSERT INTO department (deptName)
VALUES ("Aircraft Fire Fighter");

INSERT INTO department (deptName)
VALUES ("Bulk Fueler");

INSERT INTO department (deptName)
VALUES ("Company Office");

INSERT INTO department (deptName)
VALUES ("Squadron Office");

INSERT INTO role (title, salary, department_id)
VALUES ("LTCOL", 100000.00, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("CPT", 70000.00, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("SgtMaj", 70000.00, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("GySgt", 50000.00, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("SSgt", 45000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("SSgt", 45000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("SSgt", 45000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Sgt", 35000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sgt", 35000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sgt", 35000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Cpl", 30000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Cpl", 30000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Cpl", 30000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Lcpl", 25000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Lcpl", 25000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lcpl", 25000.00, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Cody", "Blankenship", 8);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jacob", "Gore", 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Nick", "Gohl", 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ryan", "Oakley", 12);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "Doe", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Barrett", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Gomer", "Pyle", 16);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Smedley", "Butler", 15);