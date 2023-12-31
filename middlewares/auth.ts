import { Request, Response } from "express"

const jwt = require('jsonwebtoken')
require('dotenv').config()

type MyFunctionType = () => void

export default {

    generateToken:(mail:String)=>{
        const token = jwt.sign({mail},process.env.JWTSECRET)
        return token
    },
    
    verifyToken:(req:Request,res:Response,next:MyFunctionType)=>{
        try {
            let token = req.headers.authorization

            if(!token){
                return res.status(403).json({errMsg:"Access denied"})
            }

            if(token.startsWith('Bearer')){
                token = token.slice(7,token.length).trimStart()
            }

            const verified = jwt.verifiy(token,process.env.JWTSECRET)

            if(verified){
                next()
            }else{
                return res.status(403).json({errMsg:"Access denied"})
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({errMsg:"Server Error"})
        }
    }
}