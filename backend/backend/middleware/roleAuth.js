// Middleware to check role with logging and detailed error messages
const checkRole = (requiredRoles) => (req, res, next) => {
  const { role } = req.user;

  // Log the current user's role for debugging
  console.log(`User role: ${role}`);

  // Check if the user's role is included in the required roles
  if (!requiredRoles.includes(role)) {
    return res.status(403).json({
      success: false,
      message: "Forbidden - insufficient permissions",
    });
  }

  // Proceed to the next middleware or route handler
  next();
};
export default checkRole;
