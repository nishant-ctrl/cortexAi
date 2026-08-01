import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";
import crypto from "crypto"; 
export const login = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }
        const decoded = await getAuth(app).verifyIdToken(token);
        if (!decoded) {
            return res.status(404).json({ message: "Token not correct" });
        }
        let user = await User.findOne({ firebaseUid: decoded.uid });
        if (!user) {
            user = await User.create({
                name: decoded.name,
                firebaseUid: decoded.uid,
                email: decoded.email,
                avatar: decoded.picture,
            });
        }
        const sessionId = crypto.randomUUID();
        redis.set(
            `session-${sessionId}`,
            JSON.stringify({
                userId: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            }),
            "EX",
            7 * 24 * 60 * 60,
        );

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const logout=async (req,res) => {
    try {
        const sessionId=req.cookies?.session
        await redis.del (`session-${sessionId}`)
        res.clearCookie("session")
        res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}