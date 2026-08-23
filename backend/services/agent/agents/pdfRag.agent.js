import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/vectorDb.js";
import { getModel } from "../config/llmModel.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfRagAgent = async (state) => {
    try {
        const buffer = await fs.readFile(state.file.path);
        const parsedPdf = new PDFParse({ data: buffer });
        const result = await parsedPdf.getText();
        const text = result.text;
        // console.log(text);
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const docs = await splitter.createDocuments([text]);
        const collectionName = `pdf-${Date.now()}`;
        const store=await vectorStore(docs, collectionName);

        const relevantDocs = await store.similaritySearch(
            state.prompt,
            5,
        );
        // console.log("Relevant Docs:", relevantDocs);
        const context = relevantDocs.map((d) => d.pageContent).join("\n\n");
        const llm = await getModel("pdf");
        const message = [
            new SystemMessage(`
                You are CortexAI PDF Assistant.

Rules:

Answer ONLY from the uploaded PDF.

Never make up information.

If the answer is not present in the PDF, reply:

"I couldn't find this information in the uploaded PDF."

Use Markdown formatting.
                `),
            new HumanMessage(`
                Context:${context}

                Question:${state.prompt}
                `),
        ];
        const res = await llm.invoke(message);
        await deductCredits(state.userId,"pdf")
        return {
            ...state,
            aiResponse: res.content,
        };
    } catch (error) {
        console.log(error);
        return {
            ...state,
            aiResponse: "Failed to analyze pdf",
        };
    }finally{
        if (state.file?.path) {
            await fs.unlink(state.file.path).catch(() => {});
        }
    }
};
