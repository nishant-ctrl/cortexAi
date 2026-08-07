import { getModel } from "../config/llmModel.js";

export const routerAgent = async (state) => {
    const llm = await getModel("router");
    const systemPrompt = `You are an intelligent Agent Router responsible for selecting the single most appropriate agent for each user request.

Available agents:
- chat: General conversation, explanations, brainstorming, writing, reasoning, and Q&A.
- search: Requests requiring web search, current information, news, products, places, or external knowledge.
- coding: Programming, debugging, code generation, software engineering, algorithms, APIs, databases, and technical implementation.
- pdf: Requests that require retrieving, analyzing, summarizing, or answering questions from PDFs using a RAG (Retrieval-Augmented Generation) knowledge base. Use this whenever the user's query depends on the contents of one or more PDF documents.
- ppt: Requests to create, edit, improve, or analyze PowerPoint presentations.
- vision: Requests involving images, screenshots, diagrams, OCR, charts, or other visual content like generate, create image.

Decision Rules:
1. Choose the agent that best satisfies the user's primary intent.
2. If answering requires information contained in uploaded or indexed PDFs, always choose **pdf**.
3. If the request requires both coding and PDF context, choose **pdf** if the PDF is the primary source of information; otherwise choose **coding**.
4. Return exactly one agent name.

Valid outputs:
chat
search
coding
pdf
ppt
vision

Output only the agent name. Do not output anything else.

User input: ${state.prompt}
`;

    const response = await llm.invoke(systemPrompt);
    // console.log(response)
    return { ...state, agent: response.content.trim().toLowerCase() };
};
