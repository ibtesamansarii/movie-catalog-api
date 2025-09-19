import express from "express";
import MoviePoster from "../models/moviePoster.model.js";
import upload from "../middlewares/multer.middleware.js";

const router = express().router;

router.get("/",async(req, res) => {
    try {
        const moviePoster = await MoviePoster.find();
        res.json(moviePoster);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/", upload.single("poster"), async(req, res) => {
    try {
        const { movieName } = req.body;
        const poster = req.file? req.file.filename : null;

        if(!poster) {
            return res.status(400).json({ error: "Poster is required" });
        }

        const moviePoster = new MoviePoster({ movieName, poster });
        await moviePoster.save();

        res.status(201).json(moviePoster);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", upload.single("poster"), async(req, res) => {
    try {
        const { movieName } = req.body;
        const poster = req.file? req.file.filename : undefined;

        const updateData = {};
        if (movieName) updateData.movieName = movieName;
        if (poster) updateData.poster = poster;

        const updatedMovie = await MoviePoster.findByIdAndUpdate(req.params.id,updateData,{ new: true });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({
            error: "Cannot update the moviePoster",
            details: err.message
        });
    }
});

router.delete("/:id", async(req, res) => {
    try {
        await MoviePoster.findByIdAndDelete(req.params.id);
        res.json({
            message: "Movie deleted Successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: "Failed to delete Movie",
            details: err.message
        });
    }
});

export default router;