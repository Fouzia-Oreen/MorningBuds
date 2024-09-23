import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
const app = express()
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Mongo db is connected');
})


app.use(express.json())



app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)



const PORT = (process.env.PORT)
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})