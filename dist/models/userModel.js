"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userDataBase = require('../config/dbConfig');
const createUserTable = `CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL 
)`;
userDataBase.query(createUserTable, (err) => {
    if (err) {
        console.log('Error while creating table :' + err.stack);
    }
    else {
        console.log('User table created');
    }
});
exports.default = userDataBase;
//# sourceMappingURL=userModel.js.map