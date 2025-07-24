import express from "express";
import Book from "../models/Book.js";
import cloudinary from "../lib/cloudinary";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const { title, caption, image, rating } = req.body;
    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }

    //upload image to cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;
    //save to databse
    const newBook = new Book({
      title,
      caption,
      image: imageUrl,
      rating,
      // user: req.user._id,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error creating book:", error);
    res.status(500).json({ error: "Error creating book" });
  }
});

export default router;
