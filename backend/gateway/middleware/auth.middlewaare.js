import redis from "../../shared/redis/redis.js";

const protect=async (req,res,next) => {
    try {
        const sessionId=req.cookies.session;
        if(!sessionId){
            res.status(404).json({message:"Unauthorised"});
        }
        const session = await redis.get(`session-${sessionId}`)
        if(!session){
            res.status(400).json({ message: "Session is expired. Please login again." });
        }
        req.user=JSON.parse(session);
        next()
    } catch (error) {
        return res.status(500).json({message:`Protect error: ${error.message}`})
    }
}

export default protect