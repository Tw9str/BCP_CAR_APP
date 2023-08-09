const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    if (req.user.role !== "admin") {
      return res.status(401).json({ error: "Access Denied - Admin only" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;
