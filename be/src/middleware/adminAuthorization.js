const jwt = require("jsonwebtoken");

const authorizeAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    
    // Check SUPPLIER role
    if (decoded.role !== "SUPPLIER") {
      return res.status(403).json({ 
        message: "Access denied. Supplier role required" 
      });
    }

    // ✅ SET BOTH req.userID AND req.user (for compatibility)
    req.userID = decoded.userID;
    req.role = decoded.role;
    req.username = decoded.username;
    req.email = decoded.email;
    
    // Keep req.user for backward compatibility
    req.user = {
      userID: decoded.userID,
      role: decoded.role,
      username: decoded.username,
      email: decoded.email,
    };

    console.log("✅ Admin authorized. User ID:", req.userID);
    
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token telah kedaluwarsa" });
    }
    
    return res.status(403).json({ message: error.message });
  }
};

module.exports = authorizeAdmin;