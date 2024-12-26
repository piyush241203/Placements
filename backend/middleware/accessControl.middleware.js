export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
  
  export const restrictToCollege = async (req, res, next) => {
    if (req.user.role === "global_admin") {
      return next(); // Global admin can access all data
    }
  
    if (!req.user.college || req.user.college.toString() !== req.body.college) {
      return res.status(403).json({ message: "Access restricted to your college only." });
    }
  
    next();
  };
  