import React, { useEffect } from "react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import getMessages from "../../features/getMessages";
const ChatArea = () => {
    const { selectedConversation } = useSelector((state) => state.conversation);
    const dispatch = useDispatch();
    useEffect(() => {
        const getMesg = async () => {
            // console.log(selectedConversation)
            if (selectedConversation) {
                const data = await getMessages(selectedConversation._id);
                dispatch(setMessages(data));
                // console.log(data)
            }
        };
        getMesg();
    }, [selectedConversation]);

    return (
        <div className="flex-1 flex flex-col">
            <Nav />
            <MessageList />
            <ChatInput />
        </div>
    );
};

export default ChatArea;
