const jwt  = require("jsonwebtoken");

const authenticate =  async (req, res, next) => {
     const token =
       req.headers["authorization"] &&
       req.headers["authorization"].split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }else {
        try {
            const decoded = jwt.verify(token, "pizza");
            req.user = decoded.user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token." });
        }
    }
}
module.exports = authenticate;