[{
    id: '/#21343eaf',
    name: 'Vishnu',
    room: 'The Office Fans'
}]

class Users {
    // constructors are optional
    constructor() {
        this.users = [];
    }
//     Method to add a user to the room
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }
//     Method to remove a user from the room
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
//     Gets a user from the included user array
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
//     Ability to list the users in the room
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = { Users };
