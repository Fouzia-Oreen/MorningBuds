import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
const app = express()
dotenv.config();

// adding mongoose
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Mongo db is connected');
})

// middleware
app.use(express.json())
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)



const PORT = (process.env.PORT)
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})