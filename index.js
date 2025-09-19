import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movie.routes.js";
import authRoutes from "./routes/auth.routes.js";
import moviePosterRoutes from "./routes/moviePoster.routes.js"
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected Sucessfully!!!")
})
.catch(err=> console.error("MongoDB connection failed"));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(limiter);
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/moviePoster', moviePosterRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is Running on Port http://localhost:${PORT}`);
});