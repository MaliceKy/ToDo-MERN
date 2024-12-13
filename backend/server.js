import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
  origin: '*', // For testing - we'll lock this down later
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API routes
app.use("/api/users", userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running!' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});