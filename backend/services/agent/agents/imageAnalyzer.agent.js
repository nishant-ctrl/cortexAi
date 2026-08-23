import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js";
import fs from "fs";
import { deductCredits } from "../utils/deductCredits.js";
export const imageAnalyzerAgent = async (state) => {
    try {
        const llm = await getModel("imageAnalyzer");
        const imageBuffer = await fs.readFile(state.file.path);
        const base64Image = imageBuffer.toString("base64");
        const messages = [
            new SystemMessage(`You are CortexAI Image Analyzer Agent.

Rules:

Analyze only the uploaded image.

Answer the user's question accurately.

If text exists in the image, extract it.

If charts or tables exist, explain them.

If something is unclear, say so.

Use Markdown when helpful.

Do not hallucinate.`),
            new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: state.prompt || "Analyze the image",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${state.file.mimtype};base64,${base64Image}`,
                        },
                    },
                ],
            }),
        ];
        const res = await llm.invoke(messages);
        await deductCredits(state.userId,"vision")
        return {
            ...state,
            aiResponse: res.content,
        };
    } catch (error) {
        console.log(error);
        return {
            ...state,
            aiResponse: "Failed to analyze file",
        };
    } finally {
        fs.unlink(state.file.path);
    }
};
