const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/users');
const controllerRegions = require('../controllers/regions');
const upload = require('../upload/uploadImage')

router.post('/newUser', upload.single('image'), controllerUser.addNewUser);
router.post('/signIn', controllerUser.findUser);
router.post('/addRegionForUser', controllerUser.addRegionForUser);

router.get('/:region_name', controllerRegions.getRegionFacts);

module.exports = router;
