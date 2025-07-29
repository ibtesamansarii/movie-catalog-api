import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

dotenv.config();
const router = express.Router();

//Register Route
router.post("/register", async(req,res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name&&email&&password)) {
            return res.status(400).json({ error: "All fields are required"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) res.status(400).json({ error: "Email already registered"});

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({
            error: "Failed to register User",
            details: error.message
        })
    }
})

//Login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: "No such email found in Database"});
        }
    
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({ error: "Password is incorrect"});
        }
    
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        
        console.log("Gen Token ", token);

        return res.json({
            message: "Login successful",
            token
        })
    } catch (error) {
        return res.status(500).json({
            error: "Failed to login",
            details: error.message
        });
    }
})

export default router;