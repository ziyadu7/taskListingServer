import { Request, Response } from 'express';
import userDataBase from '../models/userModel'

export default {
    login : async(req:Request,res:Response) : Promise<void>=>{
        try {
            const {email, password} = req.body

            const isExist = await userDataBase.query(
                `SELECT * FROM users WHERE email=${email}`
            )
            console.log(isExist);
            
        } catch (error) {
            console.log(error);  
            res.status(200).json({errMsg:'Server Error'})
        }
    },
    register:async (req:Request,res:Response): Promise<void> => {
        try {

            const {email, password} = req.body

            const isExist = await userDataBase.query(
                `SELECT * FROM users WHERE email=${email}`
            )

            console.log(isExist,'==');
            

            // if(isExist){
            //     res.status(409).json({errMsg:"User with the mail is aleady exist"})
            // }

            await userDataBase.query(
                'INSERT INTO users (email,password) values(?,?)',
                [
                    email,
                    password
                ],
                (err,result)=>{
                    if(err){
                        console.log('Error while inserting data :'+err);    
                    }else{
                        console.log("Data inserted successfully");
                        res.status(200).json({ message: "Data inserted successfully" });
                    }
                }
            )
        } catch (error) {
            console.log(error);  
            res.status(200).json({errMsg:'Server Error'})
        }
    }
}