"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
function hashPassword(password) {
    bcrypt_1.default
        .hash(password, process.env.saltRounds)
        .then(hash => {
        console.log('Hash ', hash);
        return hash;
    })
        .catch(err => console.error(err.message));
}
exports.default = hashPassword;
//# sourceMappingURL=passwordHash.js.map