import { Conversation } from "../model/conversation.model.js";
import { Message } from "../model/message.model.js";

const createConversation = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const conversation = await Conversation.create({ userId });
        return res.status(201).json(conversation);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `create conversation error: ${error.message}` });
    }
};
const getConversations = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        if (!userId) {
            return res.status(400).json({ message: "UserId not in headers" });
        }
        const conversations = await Conversation.find({ userId }).sort({
            updatedAt: -1,
        });
        return res.status(200).json(conversations);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `get conversations error: ${error.message}` });
    }
};
const updateConversation = async (req, res) => {
    try {
        const { id, title } = req.body;
        if (!id || !title) {
            return res.status(400).json({ message: "Insufficiant data sent" });
        }
        const conversation = await Conversation.findByIdAndUpdate(id, {
            title,
        }).sort({
            updatedAt: -1,
        });
        return res.status(200).json(conversation);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `update conversation error: ${error.message}` });
    }
};

const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;
        if (!conversationId || !role || !content) {
            return res.status(400).json({ message: "Insufficiant data sent" });
        }
        const message = await Message.create({
            conversationId: conversationId,
            role: role,
            content: content,
        });
        return res.status(201).json(message);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `save message error: ${error.message}` });
    }
};
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({ message: "conversationId not sent" });
        }
        const messages = await Message.find({
            conversationId: conversationId,
        }) ;
        return res.status(200).json(messages);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `get messages error: ${error.message}` });
    }
};

export {
    createConversation,
    getConversations,
    updateConversation,
    saveMessage,
    getMessages,
};
