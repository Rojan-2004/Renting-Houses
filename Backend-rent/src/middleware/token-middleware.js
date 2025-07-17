import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to verify JWT token and attach user info
export function authenticateToken(req, res, next) {
  const publicRoutes = ["/api/auth/login", "/api/auth/register", "/api/users"];
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = decoded; // Attach decoded payload (id, role) to request
    next();
  });
}

// Middleware to require a specific role (e.g., 'admin')
export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }
    next();
  };
}
