const jwt = require("jsonwebtoken");

const authorizeAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", {
      userID: decoded.userID,
      role: decoded.role,
      username: decoded.username
    });
    
    // Check SUPPLIER role
    if (decoded.role !== "SUPPLIER") {
      console.log("❌ Access denied. Role:", decoded.role);
      return res.status(403).json({ 
        message: "Access denied. Supplier role required" 
      });
    }

    // ✅ CRITICAL: Set req.userID, req.role, etc
    req.userID = decoded.userID;
    req.role = decoded.role;
    req.username = decoded.username;
    req.email = decoded.email;
    
    // Also set req.user for compatibility
    req.user = {
      userID: decoded.userID,
      role: decoded.role,
      username: decoded.username,
      email: decoded.email,
    };

    console.log("✅✅✅ req.userID SET TO:", req.userID);
    
    next();
  } catch (error) {
    console.error("❌ Token verification error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token telah kedaluwarsa" });
    }
    
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authorizeAdmin;