const express = require('express');
const router = express.Router();
const controllerUser = require('../../controllers/users');
const controllerMovies = require('../../controllers/regions');

router.post('/newUser', upload.single('image'), controllerUser.addNewUser);
router.post('/addRegionForUser', controllerUser.addRegionForUser);

router.get('/regionFacts', controllerRegions.getRegionFacts);

module.exports = router;
