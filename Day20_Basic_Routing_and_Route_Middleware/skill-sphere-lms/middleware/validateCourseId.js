module.exports = function validateCourseId(req, res, next) {
  const { id } = req.params;
  // Check numeric ID: only digits allowed
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }
  // Proceed to the route handler
  next();
};
