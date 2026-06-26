const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Remove "Bearer " if present
    const cleanToken = token.replace("Bearer ", "");

    const verified = jwt.verify(cleanToken, process.env.JWT_SECRET);

    req.user = verified; // store user info in request

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;