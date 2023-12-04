"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.default = {
    generateToken: (mail) => {
        const token = jwt.sign({ mail }, process.env.JWTSECRET);
        return token;
    },
    verifyToken: (req, res, next) => {
        try {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(403).json({ errMsg: "Access denied" });
            }
            if (token.startsWith('Bearer')) {
                token = token.slice(7, token.length).trimStart();
            }
            const verified = jwt.verifiy(token, process.env.JWTSECRET);
            if (verified) {
                next();
            }
            else {
                return res.status(403).json({ errMsg: "Access denied" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ errMsg: "Server Error" });
        }
    }
};
//# sourceMappingURL=auth.js.map