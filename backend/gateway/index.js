import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import protect from "./middleware/auth.middlewaare.js";
import { getCurrentUser } from "./controller/user.controller.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(cookieParser());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, Gateway!" });
});

app.get("/api/me",protect,getCurrentUser)


app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/chat", protect, proxyWithHeader(process.env.CHAT_SERVICE));

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});
