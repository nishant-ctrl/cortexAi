import { getAuth } from "firebase-admin/auth";
const login = async (req, res) => {
    try {
        const { token } = req.body;
        await getAuth();
    } catch (error) {}
};
