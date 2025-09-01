import express from 'express';
import corse from 'cors';
import dotenv from 'dotenv';
import cookeParser from 'cookie-parser';
import { connectDB } from './db/mongodb.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookeParser());
app.use(corse({credentials: true}))

app.get('/', (re, res)=>{
    res.send("this is root route")
})
app.post('/api/auth', authRouter)
app.post('/api/user', userRouter)

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server started in port no: ${PORT}`);
})