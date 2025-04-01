import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role; // Assume you're saving the role in JWT
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during token verification",
    });
  }
};
