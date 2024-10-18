import express from "express";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
	const user = req.body; // user will send this data

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
};