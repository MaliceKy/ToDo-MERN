import express from "express";
import dotenv from "dotenv";
import path from "path";
import {connectDB} from './config/db.js'
import userRoutes from "./routes/user.route.js" // For Signing Up
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

const __dirname = path.resolve();

app.use(express.json()); // allows json data for the req.body
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Orgin","*");
	res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials","true");
	next;
});
//app.use(express.static(__dirname + "../frontend/build"));

// app.use(express.static(path.join(__dirname, "/frontend/build")));

/*
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
*/

app.use("/api/users", userRoutes); // post for users to create logins

if (process.env.NODE_ENV === "production") {
	
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});