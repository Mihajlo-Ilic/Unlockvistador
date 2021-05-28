const express = require('express');
const router = express.Router();

const controllerRegions = require('../controllers/regions');

router.get('/:region_name', controllerRegions.getRegion);
router.post('/:region_name', controllerRegions.addComment);
router.post('/',controllerRegions.inputQuestion);
router.patch('/:region_name',controllerRegions.unlockRegion);

module.exports = router;
