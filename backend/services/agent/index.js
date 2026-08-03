import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 8003;

const app = express();
app.use(express.json());

// app.use("/", router);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Agent!" });
});

app.listen(PORT, () => {
    console.log(`Agent running on port ${PORT}`);
    connectDb();
});
