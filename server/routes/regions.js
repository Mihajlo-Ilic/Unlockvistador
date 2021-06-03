const express = require('express');
const router = express.Router();

const controllerRegions = require('../controllers/regions');
const controllerUser = require('../controllers/users')

router.get('/getRegionFacts', controllerUser.authenticateUser, controllerRegions.getRegionFacts);
router.get('/getRegionComments', controllerUser.authenticateUser, controllerRegions.getRegionComments);
router.get('/getRegionQuestion', controllerUser.authenticateUser, controllerRegions.getRegionQuestion);
router.post('/addComment', controllerUser.authenticateUser, controllerRegions.addComment);

//router.get('/:region_name', controllerRegions.getRegion);

router.post('/inputQuestion',controllerRegions.inputQuestion);
router.patch('/:region_name',controllerRegions.unlockRegion);


module.exports = router;
