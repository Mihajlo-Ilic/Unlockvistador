const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/users');
const Regions = require('../models/regions');

const controllerUser = require('../controllers/users');
const upload = require('../upload/uploadImage')

router.get('/', function(req, res) {
    console.log("http://localhost:3000/users");
    res.status(200).json({});
})


router.post('/auth', controllerUser.authUser);

router.get('/findUser', controllerUser.findUser);

router.post('/signin', controllerUser.addNewUser);

router.patch('/addRegion', controllerUser.authenticateUser, controllerUser.addRegionForUser)

//router.delete('/logout', controllerUser.authenticateUser, controllerUser.logOut)


module.exports = router;
