import express from "express";
import Movie from "../models/movie.model.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({
            error : 'Falied to fetch movies'
        });
    }
});

router.post('/', verifyToken, async(req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({
            error : 'Failed to add Movie', 
            details : error.message
        });
    }
})

router.put('/:id', verifyToken, async(req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);
    } catch (error) {
        res.status(400).json({
            error : 'Failed to update movie', 
            details : error.message 
        });
    }
})

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            error : 'Failed to delete movie'
        });
    }
})

export default router;
