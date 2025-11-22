const express = require('express');
const router = express.Router();
const {
    validateCourseCreate,
    validateCourseUpdate,
    handleValidationErrors
} = require('../middleware/validation');
const {
    apiLimiter,
    createCourseLimiter
} = require('../middleware/rateLimiter');
const { readCourses, writeCourses, generateNewId } = require('../utils/fileStorage');

// Helper function to find course by ID
const findCourseById = (courses, id) => courses.find(course => course.id === parseInt(id));

// Apply rate limiting to all routes
router.use(apiLimiter);

// GET /api/v1/courses - Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await readCourses();

        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Error reading courses:', error);
        res.status(500).json({
            error: 'Failed to retrieve courses',
            message: error.message
        });
    }
});

// GET /api/v1/courses/:id - Get single course
router.get('/:id', async (req, res) => {
    try {
        const courses = await readCourses();
        const course = findCourseById(courses, req.params.id);

        if (!course) {
            return res.status(404).json({
                error: 'Course not found',
                message: `Course with ID ${req.params.id} not found`
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Error reading course:', error);
        res.status(500).json({
            error: 'Failed to retrieve course',
            message: error.message
        });
    }
});

// POST /api/v1/courses - Create new course
router.post(
    '/',
    createCourseLimiter,
    validateCourseCreate,
    handleValidationErrors,
    async (req, res) => {
        try {
            const { name, duration, instructor, price, description } = req.body;

            const courses = await readCourses();

            // Check if course name already exists
            const existingCourse = courses.find(course =>
                course.name.toLowerCase() === name.toLowerCase()
            );

            if (existingCourse) {
                return res.status(409).json({
                    error: 'Course already exists',
                    message: `A course with name '${name}' already exists`
                });
            }

            const newCourse = {
                id: generateNewId(courses),
                name,
                duration: parseInt(duration),
                instructor: instructor || 'TBA',
                price: price ? parseFloat(price) : 0,
                description: description || '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            courses.push(newCourse);
            await writeCourses(courses);

            res.status(201).json({
                success: true,
                message: 'Course created successfully',
                data: newCourse
            });
        } catch (error) {
            console.error('Error creating course:', error);
            res.status(500).json({
                error: 'Failed to create course',
                message: error.message
            });
        }
    }
);

// PUT /api/v1/courses/:id - Update course
router.put(
    '/:id',
    validateCourseUpdate,
    handleValidationErrors,
    async (req, res) => {
        try {
            const courses = await readCourses();
            const courseIndex = courses.findIndex(course => course.id === parseInt(req.params.id));

            if (courseIndex === -1) {
                return res.status(404).json({
                    error: 'Course not found',
                    message: `Course with ID ${req.params.id} not found`
                });
            }

            const course = courses[courseIndex];

            // Check if name is being changed and if it conflicts with existing course
            if (req.body.name && req.body.name !== course.name) {
                const existingCourse = courses.find(c =>
                    c.id !== parseInt(req.params.id) &&
                    c.name.toLowerCase() === req.body.name.toLowerCase()
                );

                if (existingCourse) {
                    return res.status(409).json({
                        error: 'Course name conflict',
                        message: `Another course with name '${req.body.name}' already exists`
                    });
                }
            }

            // Update course fields
            Object.keys(req.body).forEach(key => {
                if (req.body[key] !== undefined) {
                    course[key] = req.body[key];
                }
            });

            course.updatedAt = new Date().toISOString();
            courses[courseIndex] = course;

            await writeCourses(courses);

            res.status(200).json({
                success: true,
                message: 'Course updated successfully',
                data: course
            });
        } catch (error) {
            console.error('Error updating course:', error);
            res.status(500).json({
                error: 'Failed to update course',
                message: error.message
            });
        }
    }
);

// DELETE /api/v1/courses/:id - Delete course
router.delete('/:id', async (req, res) => {
    try {
        const courses = await readCourses();
        const courseIndex = courses.findIndex(course => course.id === parseInt(req.params.id));

        if (courseIndex === -1) {
            return res.status(404).json({
                error: 'Course not found',
                message: `Course with ID ${req.params.id} not found`
            });
        }

        const deletedCourse = courses.splice(courseIndex, 1)[0];
        await writeCourses(courses);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully',
            data: deletedCourse
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            error: 'Failed to delete course',
            message: error.message
        });
    }
});

module.exports = router;