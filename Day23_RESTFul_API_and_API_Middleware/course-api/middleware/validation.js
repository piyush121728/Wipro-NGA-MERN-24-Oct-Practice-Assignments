const { body, validationResult } = require('express-validator');

// Validation rules for course creation
const validateCourseCreate = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Course name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Course name must be between 3 and 100 characters')
        .escape(),

    body('duration')
        .notEmpty()
        .withMessage('Course duration is required')
        .isInt({ min: 1, max: 52 })
        .withMessage('Duration must be a number between 1 and 52 weeks'),

    body('instructor')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Instructor name must be between 2 and 50 characters')
        .escape(),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number')
];

// Validation rules for course update
const validateCourseUpdate = [
    body('name')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Course name must be between 3 and 100 characters')
        .escape(),

    body('duration')
        .optional()
        .isInt({ min: 1, max: 52 })
        .withMessage('Duration must be a number between 1 and 52 weeks'),

    body('instructor')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Instructor name must be between 2 and 50 characters')
        .escape(),

    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number')
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
        }));

        return res.status(400).json({
            error: 'Validation failed',
            details: errorMessages
        });
    }
    next();
};

module.exports = {
    validateCourseCreate,
    validateCourseUpdate,
    handleValidationErrors
};