const express = require('express')
const userRouter = require('./routes/userRouter')
const dbConnect = require('./config/dbConfig')
const cors = require('cors')

require('dotenv').config()
const app = express()

const PORT = process.env.PORT

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/',userRouter)

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});