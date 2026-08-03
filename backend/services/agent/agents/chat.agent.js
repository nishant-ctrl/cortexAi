import { getModel } from "../config/llmModel.js";

export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const systemPrompt = "You are CortexAi an intelligent multi agent ai assistant";
    const response = await llm.invoke([
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "human",
            content: state.prompt,
        },
    ]);
    return {
        ...state,
        aiResponse:response.content
    }
};
