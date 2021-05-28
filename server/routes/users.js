const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/users');
const Regions = require('../models/regions');

const controllerUser = require('../controllers/users');
const upload = require('../upload/uploadImage')


//router.post('/', controllerUser.addNewUser);
router.get('/', function(req, res) {
    console.log("http://localhost:3000/users");
    res.status(200).json({});
})
router.post('/auth', controllerUser.authUser);
router.get('/findUser', controllerUser.findUser);
router.post('/signin', controllerUser.addNewUser);
//router.post('/login', controllerUser.addNewUser);

module.exports = router;
