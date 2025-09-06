import express from 'express';
import './loadEnv.js';
import dotenv from 'dotenv';
import connectDB from './models/dbConnection.js';
import authRouter from './routes/authRouter.js'
import cors from "cors";


dotenv.config({
    path: "./.env"

})

// After dotenv config in loadEnv.js
console.log('Loaded GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? 'Yes' : 'No');


const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true  // Enable credentials
}));

app.get('/',(req,res) => {
    res.send('Hello from auth server');
})

app.use('/auth', authRouter)

const PORT = process.env.PORT || 8080 ;

connectDB()
.then(() => {
    app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`)
})
})
.catch((err) => {
    console.log('MongoDB connection error' , err)
})
