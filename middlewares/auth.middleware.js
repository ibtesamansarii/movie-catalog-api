import jwt from "jsonwebtoken"

const verifyToken = (req,res,next) => {
    try {
        const userToken = req.headers.authorization;
        if(!userToken || !userToken.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Access Denied. No token provided."
            });
        }

        const token = userToken.split(" ")[1];
        console.log("auth token", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            error: "Invalid or Expired Token"
        });
    }
}

export default verifyToken;