const { body } = require('express-validator');

const validateState = [
    body('name').notEmpty().withMessage('State name is required'),
    body('population').isNumeric().withMessage('Population must be a number'),
    body('area').isNumeric().withMessage('Area must be a number'),
];

module.exports = validateState;
