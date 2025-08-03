const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // first check request headers have auth or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    //verify the jet token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user info to the request obj
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

//unction to generate JWT token
const generateToken = (userData) => {
  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
