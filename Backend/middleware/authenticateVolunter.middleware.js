function authenticateVolunter(req, res, next) {
  console.log(req.user.response.type);
  const type = req.user.response.type;
  if (type === "volunteer") {
    // If user is a volunteer, proceed to the next middleware or route handler
    next();
  } else {
    // If user is not authorized (not a volunteer), send a 403 Forbidden response
    res.status(403).json({ message: "Not authorized" });
  }
}

module.exports = {
  authenticateVolunter,
};
