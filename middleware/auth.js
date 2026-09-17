const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "No token,access denied" });
    }
    try {
        const decoded = jwt.verify(token, "secretkey");
        next();
    } catch (e) {
        res.json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;