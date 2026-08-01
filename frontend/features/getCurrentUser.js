import api from "../utils/axois"

const getCurrentUser=async () => {
    try {
        const res=await api.get("/api/me")
        if(res.status===200){
            // console.log(res.data)
            return res.data;
        }
        return null;
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getCurrentUser