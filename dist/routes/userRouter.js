"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express1 = require('express');
const router = express1.Router();
const userController_1 = __importDefault(require("../controller/userController"));
const validation_1 = __importDefault(require("../middlewares/validation"));
router.post('/login', validation_1.default.userValidation, userController_1.default.login);
router.post('/register', validation_1.default.userValidation, userController_1.default.register);
module.exports = router;
//# sourceMappingURL=userRouter.js.map