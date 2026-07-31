import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axois";

const App = () => {
    const handleLogin = async (token) => {
        try {
            const res = await api.post("/auth/login", { token });
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
          console.log(error)
        }
    };
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        await handleLogin(token);
        console.log(data);
    };
    return (
        <div className="bg-slate-500 text-center min-h-screen flex justify-center items-center">
            <button
                onClick={googleLogin}
                className="bg-amber-800 hover:cursor-pointer p-5 rounded-3xl"
            >
                Continue with Google
            </button>
        </div>
    );
};

export default App;
