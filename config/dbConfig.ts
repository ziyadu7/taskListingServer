const mysql = require('mysql2')
require('dotenv').config()

const dbConfig = {
    host:'localhost',
    user:process.env.dbUser,
    password:process.env.dbPassword,
    database:process.env.database
}


const db = mysql.createConnection(dbConfig)

// CONNECT TO DATABASE //

db.connect((err)=>{
    if(err){
        console.log('Databse connection error ' + err.stack);
        return
    }else{
        console.log('Database connected')

        db.query('CREATE DATABASE IF NOT EXISTS tasklising',(err)=>{
            if(err){
                console.log('Error while creating database',err);
            }
        })
    }
})

module.exports = db