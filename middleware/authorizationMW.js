const userSchema = require("../model/userSchema");
module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await userSchema
        .findOne({ _id: req.token.id })
        .populate("role");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
        
      let userPermissions = user.role?.permissions || [];
      

      const hasPermission = userPermissions.some((p) => p === permission);

      if (user.type === "admin" || hasPermission) {
        return next();
      }

      res.status(403).json({ message: "Forbidden" });
    } catch (error) {
   
      next(error);
    }
  };
};
