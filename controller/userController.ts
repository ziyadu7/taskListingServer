import { Request, Response } from 'express';
import userDataBase from '../models/userModel'
import auth from '../middlewares/auth';

export default {
    login : async(req:Request,res:Response) : Promise<void>=>{
        try {
            const {email, password} = req.body

            const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
            userDataBase.query(query, [email,password], (error:Object, results:Array<Object>) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ errMsg: 'Server Error' });
                } else {
                    if (results.length > 0) {
                        console.log('User exists:', results)
                        const token = auth.generateToken(email)
                        res.status(200).json({ message: 'User found', token});
                    } else {
                        console.log('User does not exist with the password and mail');
                        res.status(404).json({ errMsg: 'User does not exist with the password and mail' });
                    }
                }
            });
            
        } catch (error) {
            console.log(error);  
            res.status(200).json({errMsg:'Server Error'})
        }
    },
    register:async (req:Request,res:Response): Promise<void> => {
        try {

            const {email, password} = req.body

            const query = 'SELECT * FROM users WHERE email = ?';
            userDataBase.query(query, [email], (error:Object, results:Array<Object>) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ errMsg: 'Server Error' });
                } else {
                    if (results.length > 0) {
                        console.log('User exists:', results)
                        res.status(409).json({ errMsg: 'User already registered' });
                    } else {
                        userDataBase.query(
                            'INSERT INTO users (email,password) values(?,?)',
                            [
                                email,
                                password
                            ],
                            (err,result)=>{
                                if(err){
                                    throw err 
                                }else{
                                    console.log("Data inserted successfully");
                                    res.status(200).json({ message: "User registered successfully" });
                                }
                            }
                        )
                    }
                }
            })
            
        } catch (error) {
            console.log(error);  
            res.status(200).json({errMsg:'Server Error'})
        }
    }
}