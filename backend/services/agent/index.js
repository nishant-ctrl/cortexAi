import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/agent.route.js";

dotenv.config();

const PORT = process.env.PORT || 8003;

const app = express();
app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
    console.log(err)
    if (err.status) {
        return res.status(err.status).json(err.data);
    }
    return res.status(500).json({message:`agent error ${err}`})
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello from Agent!" });
});

app.listen(PORT, () => {
    console.log(`Agent running on port ${PORT}`);
    connectDb();
});
