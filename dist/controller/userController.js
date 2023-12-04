"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = __importDefault(require("../middlewares/auth"));
exports.default = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            userModel_1.default.query(query, [email, password], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ errMsg: 'Server Error' });
                }
                else {
                    if (results.length > 0) {
                        console.log('User exists:', results);
                        const token = auth_1.default.generateToken(email);
                        res.status(200).json({ message: 'User found', token });
                    }
                    else {
                        console.log('User does not exist with the password and mail');
                        res.status(404).json({ errMsg: 'User does not exist with the password and mail' });
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ errMsg: 'Server Error' });
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const query = 'SELECT * FROM users WHERE email = ?';
            userModel_1.default.query(query, [email], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ errMsg: 'Server Error' });
                }
                else {
                    if (results.length > 0) {
                        console.log('User exists:', results);
                        res.status(409).json({ errMsg: 'User already registered' });
                    }
                    else {
                        userModel_1.default.query('INSERT INTO users (email,password) values(?,?)', [
                            email,
                            password
                        ], (err, result) => {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log("Data inserted successfully");
                                res.status(200).json({ message: "User registered successfully" });
                            }
                        });
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ errMsg: 'Server Error' });
        }
    })
};
//# sourceMappingURL=userController.js.map