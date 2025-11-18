const express = require('express');
const router = express.Router();
const validateCourseId = require('../middleware/validateCourseId');
const coursesData = require('../data/courses.json'); // load JSON file

router.get('/:id', validateCourseId, (req, res) => {
  const { id } = req.params;

  // find the course with matching id (convert id to number)
  const course = coursesData.courses.find(c => c.id === parseInt(id));

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.json(course);
});

module.exports = router;