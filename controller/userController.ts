import { Request, Response } from 'express';
import userDataBase from '../models/userModel'

export default {
    login : async(req:Request,res:Response) : Promise<void>=>{
        try {
            const {email, password} = req.body

            const query = 'SELECT * FROM users WHERE email = ?';
            userDataBase.query(query, [email], (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ errMsg: 'Server Error' });
                } else {
                    if (results.length > 0) {
                        console.log('User exists:', results)
                        res.status(200).json({ message: 'User found' });
                    } else {
                        console.log('User does not exist');
                        res.status(404).json({ errMsg: 'User not found' });
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
            userDataBase.query(query, [email], (error, results) => {
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
                                    res.status(200).json({ message: "Data inserted successfully" });
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