import api from "../utils/axois";

const getMessages = async (conversationId) => {
    try {
        const { data } = await api.get(
            `/api/chat/get-message/${conversationId}`,
        );
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getMessages;
