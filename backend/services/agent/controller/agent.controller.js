import axios from "axios";
import { graph } from "../graph/graph.js";
export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;
        if (!prompt) {
            return res.status(404).json({ message: "Prompt or id not found" });
        }
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "user",
            content: prompt,
        });
        const result = await graph.invoke({ prompt, conversationId });
        const response = result.aiResponse;
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId,
            role: "assistant",
            content: response,
        });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(`Agent error: ${error.message}`);
    }
};
