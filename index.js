import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import movieRoutes from "./routes/movie.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("MongoDB connected Sucessfully!!!")
})
.catch(err=> console.error("MongoDB connection failed"));

app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is Running on Port http://localhost:${PORT}`);
});