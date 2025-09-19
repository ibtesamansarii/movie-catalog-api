import mongoose from "mongoose";

const moviePosterSchema = new mongoose.Schema({
    movieName: {
        required: true,
        type: String
    },
    poster: {
        required: true,
        type: String
    }
},{
    timestamps: true
});

const MoviePoster = mongoose.model("MoviePoster", moviePosterSchema);

export default MoviePoster;