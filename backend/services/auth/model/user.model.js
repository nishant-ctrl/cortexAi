import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        firebaseUid: { type: String, unique: true },
        email: { type: String, unique: true },
        avatar: String,
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
