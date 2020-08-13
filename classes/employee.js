class Employee {
    constructor(firstName, lastName, role){
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    };

    setRole(connection, newRole) {
        connection.query(`UPDATE role SET role = ${newRole} WHERE id = ${this.id}`)
    };
};

module.exports = Employee;