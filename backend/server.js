import express from "express";
import dotenv from "dotenv";
import {connectDB} from './config/db.js'
import User from './models/user.js';

import userRoutes from './routes/userRoutes.js'; // post for users to create logins

dotenv.config();

const app = express();

app.use(express.json()); // allows json data for the req.body

app.use("/api/users", userRoutes); // post for users to create logins

app.listen(5000, () =>{
    connectDB();
    console.log("server started at http://localhost:5000")
});