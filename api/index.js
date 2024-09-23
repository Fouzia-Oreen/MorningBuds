import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';

const app = express()

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Mongo db is connected');
})


const PORT = (process.env.PORT)
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})