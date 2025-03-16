const { body } = require('express-validator');

const validateDistrict = [
    body('name').notEmpty().withMessage('District name is required'),
    body('population').isNumeric().withMessage('Population must be a number'),
    body('state_id').notEmpty().withMessage('State ID is required'),
];

module.exports = validateDistrict;
