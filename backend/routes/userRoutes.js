import express from "express";
import User from '../models/user.js';

const router = express.Router();

// POST /api/users - Register new user
router.post("/", async (req, res) => {
    const user = req.body;

    // Check if all fields are filled
    if (!user.username || !user.password) {
        return res.status(400).json({ success: false, message: "Please enter a username and password." });
    }

    const newUser = new User(user);

    // Attempt to create an instance of the new user in the database
    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;