const express = require('express');
const districtController = require('../controllers/districtController');
const validateDistrict = require('../validators/districtValidators');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/districts', validateDistrict, validationMiddleware, districtController.addDistrict);
router.put('/districts/:name/population', districtController.updateDistrictPopulation);
router.delete('/districts/:name', districtController.deleteDistrict);
router.get('/districts/group-by-state', districtController.groupDistrictsByState);
router.get('/districts/with-states', districtController.joinStatesWithDistricts);

module.exports = router;
