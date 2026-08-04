import React, { useState, useEffect } from "react";
import {
    Coins,
    LogOut,
    MessageSquare,
    PanelLeftIcon,
    PanelRight,
    PenBoxIcon,
    PenSquare,
    Plus,
    User,
} from "lucide-react";
import { getConversations } from "../../features/getConversations";
import { createConversation } from "../../features/createConversation";
import { useDispatch, useSelector } from "react-redux";
import {
    addConversation,
    setConversations,
    setSelectedConversation,
} from "../redux/conversationSlice";
import logOut from "../../features/logOut";
import { setUserdata } from "../redux/userSlice";
const SideBar = () => {
    const [collapse, setCollapse] = useState(false);
    const [imageError, serImageError] = useState(false);
    const dispatch = useDispatch();
    const { conversations, selectedConversation } = useSelector(
        (state) => state.conversation,
    );
    const { userData } = useSelector((state) => state.user);
    useEffect(() => {
        const getConversation = async () => {
            const data = await getConversations();
            dispatch(setConversations(data));
        };
        getConversation();
    }, [userData?._id]);
    const handleCreateConversation = async () => {
        const data = await createConversation();
        dispatch(addConversation(data));
    };
    if(collapse){
        return (
            <div className="hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0">
                <button
                    className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
                    onClick={() => setCollapse(false)}
                >
                    <PanelRight />
                </button>

                <button
                    className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1"
                    onClick={handleCreateConversation}
                >
                    <Plus />
                </button>
                <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width-none] [&::-webkit-scrollbar]:hidden pt-5">
                    {conversations.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id;
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    dispatch(setSelectedConversation(conv))
                                }
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                                    isActive
                                        ? "bg-indigo-500/10 border-indigo-500/18"
                                        : "bg-transparent border-transparent"
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-5 h-5 rounded-lg rounded-lg transition-colors duration-150 ${isActive ? "text-indigo-500/15 text-indigo-700" : "bg-white/[0.05] text-slate-500"}`}
                                >
                                    <MessageSquare size={13} />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {userData?.avatar && !imageError ? (
                    <img
                        className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                        src={userData?.avatar}
                        alt={userData.name}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25">
                        <User size={15} className="text-slate-400" />
                    </div>
                )}
            </div>
        );
    }
    return (
        <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06]">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
                    <div
                        className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                        onClick={() => setCollapse(true)}
                    >
                        <PanelLeftIcon />
                        
                    </div>
                    
                    <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
                        CortexAI
                    </span>
                    <span className="text-[10px] font-medium text-indigo-400 bg-indigo-50/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide ">
                        free
                    </span>
                    <button
                        className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer"
                        onClick={handleCreateConversation}
                    >
                        <PenSquare size={14} />
                    </button>
                </div>
                <div className="px-4 pt-4 pb-1">
                    <button
                        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150"
                        onClick={handleCreateConversation}
                    >
                        <Plus size={15} />
                        New Chat
                    </button>
                </div>
                <div className=""></div>
                {conversations.length == 0 ? (
                    <div className="px-5 pt-4 pt-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
                        No Recent Conversation
                    </div>
                ) : (
                    <div className="px-5 pt-4 pt-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
                        Recents
                    </div>
                )}
                <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width-none] [&::-webkit-scrollbar]:hidden">
                    {conversations.map((conv, i) => {
                        const isActive = selectedConversation?._id == conv?._id;
                        return (
                            <div
                                key={i}
                                onClick={() =>
                                    dispatch(setSelectedConversation(conv))
                                }
                                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 ${
                                    isActive
                                        ? "bg-indigo-500/10 border-indigo-500/18"
                                        : "bg-transparent border-transparent"
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-7 h-7 rounded-lg rounded-lg transition-colors duration-150 ${isActive ? "text-indigo-500/15 text-indigo-700" : "bg-white/[0.05] text-slate-500"}`}
                                >
                                    <MessageSquare size={13} />
                                </div>
                                <span
                                    className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"}`}
                                >
                                    {conv?.title || "New Chat"}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="mx-2.5 h-px bg-white/[0.06]" />
                <div className="px-3.5 py-3.5">
                    {userData ? (
                        <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150">
                            {userData?.avatar && !imageError ? (
                                <img
                                    className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                                    src={userData?.avatar}
                                    alt={userData.name}
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25">
                                    <User
                                        size={15}
                                        className="text-slate-400"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-[13px] font-medium text-slate-100">
                                    {userData?.name}
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150
"
                                >
                                    <Coins size={16} />
                                </button>
                                <button
                                    className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                                    onClick={() => {
                                        logOut();
                                        dispatch(setUserdata(null));
                                    }}
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button className="w-full flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
