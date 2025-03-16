const express = require('express');
const stateController = require('../controllers/stateController');
const validateState = require('../validators/stateValidators');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/states', validateState, validationMiddleware, stateController.addState);
router.get('/states/:name/population', stateController.getStatePopulation);
router.get('/states', stateController.getAllStates);
router.get('/states/total-population', stateController.getTotalPopulation);
router.get('/states/average-density', stateController.getAverageDensity);

module.exports = router;
