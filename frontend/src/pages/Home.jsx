import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axois";
import { FcGoogle } from "react-icons/fc";
const Home = () => {
    const handleLogin = async (token) => {
        try {
            const res = await api.post("/api/auth/login", { token });
            if (res.status === 200) {
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleProvider);
        const token = await data.user.getIdToken();
        await handleLogin(token);
        console.log(data);
    };
    return (
        <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-[17px] font-semibold text-slate-100 tracking-tight">
                            Welcome to CortexAI
                        </h2>
                        <p className="text-[13px] text-slate-500">
                            Please login to continue using the app.
                        </p>
                    </div>
                    <button
                        onClick={googleLogin}
                        className="w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-gray-200 transition-all duration-150 cursor-pointer"
                    >
                        <FcGoogle size={15} />
                        Continue With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
