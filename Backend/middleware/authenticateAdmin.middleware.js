function authenticateAdmin(req, res, next) {
  const type = req.user.response.type;
  if (type === "admin") {
    // If user is a volunteer, proceed to the next middleware or route handler
    next();
  } else {
    // If user is not authorized (not a volunteer), send a 403 Forbidden response
    res.status(403).json({ message: "Not authorized" });
  }
}

module.exports = {
  authenticateAdmin,
};
