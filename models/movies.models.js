import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;