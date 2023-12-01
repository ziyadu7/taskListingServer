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
exports.default = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const isExist = yield userModel_1.default.query(`SELECT * FROM users WHERE email=${email}`);
            console.log(isExist);
        }
        catch (error) {
            console.log(error);
            res.status(200).json({ errMsg: 'Server Error' });
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const isExist = yield userModel_1.default.query(`SELECT * FROM users WHERE email=${email}`);
            console.log(isExist, '==');
            // if(isExist){
            //     res.status(409).json({errMsg:"User with the mail is aleady exist"})
            // }
            yield userModel_1.default.query('INSERT INTO users (email,password) values(?,?)', [
                email,
                password
            ], (err, result) => {
                if (err) {
                    console.log('Error while inserting data :' + err);
                }
                else {
                    console.log("Data inserted successfully");
                    res.status(200).json({ message: "Data inserted successfully" });
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