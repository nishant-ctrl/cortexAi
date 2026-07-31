import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
export const login = async (req, res) => {
    try {
        const { token } = req.body;
        if(!token){
            return res.status(404).json({message:"Token not found"})
        }
        const decoded = await getAuth(app).verifyIdToken(token);
        if(!decoded){
            return res.status(404).json({message:"Token not correct"})
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
        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};
