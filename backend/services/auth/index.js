import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Auth!" });
});

app.listen(PORT, () => {
    console.log(`Auth running on port ${PORT}`);
    connectDb();
});
