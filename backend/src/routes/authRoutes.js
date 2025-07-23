import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ error: "Username must be at least 3 characters" });
    }

    //check if email exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //check if username exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //get random avatar
    const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = new User({ email, username, password, profileImage });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  try {
  } catch (error) {}
});

export default router;
