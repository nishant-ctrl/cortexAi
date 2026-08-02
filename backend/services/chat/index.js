import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/chat.route.js";
dotenv.config();

const PORT = process.env.PORT || 8002;

const app = express();
app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Chat!" });
});

app.listen(PORT, () => {
    console.log(`Chat running on port ${PORT}`);
    connectDb();
});
