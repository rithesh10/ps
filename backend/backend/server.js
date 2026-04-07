//Entry point to our server

const express = require('express')
const path = require('path');
const dotenv = require('dotenv').config();  //for environment variables.
const cors = require('cors');   //cross origin resource sharing. for security purpose
const {errorHandler}=require('./middleware/errorMiddleware')
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');    //writing mongodb code in db.js file.
const port = process.env.PORT || 5000     //port for our server to run on
const color = require('colors');

const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  process.env.FRONTEND_URL ||
  'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

connectDB()
const app = express()
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}

app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(cookieParser())
app.use('/api/goals',require('./routes/index')) //
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/teacher',require('./routes/teacherRoutes'))
app.use('/api/result',require('./routes/resultRoutes'))

app.use(errorHandler)  //Overwrite the default error handler
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
})
