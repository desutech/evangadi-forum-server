const dotenv = require ('dotenv');
      dotenv.config() 
const express = require("express");
const mysql2 = require ("mysql2");
const db = require ("./db/dbConfig");
const userRoute = require ("./routes/userRoute");
const questionRoute = require ("./routes/questionRoute");
const answerRoute = require ("./routes/answerRoute");
const authMiddle = require('./middleware/authMiddleware');

const app = express();
const port = 5501;


const cors = require ("cors")
app.use(cors()) 

app.use(express.json());
app.use('/api/users', userRoute);
app.use("/api/question", authMiddle, questionRoute);
app.use("/api/answer", authMiddle, answerRoute);






async function start() { 
    try {
 const result = await db.execute ("select 'test' ");
         
 await app.listen(port);
 console.log(`listening on ${port}`)
 console.log('db connected');
    } catch (error) {
        console.log(error.message)
    }
}
start();


