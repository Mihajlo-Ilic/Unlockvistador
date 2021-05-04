const express = require('express');
const router = express.Router();

const controllerRegions = require('../controllers/regions');

router.get('/:region_name', controllerRegions.getRegion);

module.exports = router;
