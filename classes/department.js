class Department {
    constructor(deptName){
        this.deptName = deptName;
    };

    setNewDepartment() {
        connection.query("INSERT INTO department (deptName) VALUES (?)", [this.deptName])
    };
};

module.exports = Department;