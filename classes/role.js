class Role {
    constructor(title){
        this.title = title;
    };

    setNewRole() {
        connection.query("INSERT INTO role (title) VALUES (?)", [this.title])
    };
};

module.exports = Role;