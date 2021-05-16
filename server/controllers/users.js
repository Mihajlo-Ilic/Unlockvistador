require('dotenv').config()
const User = require('../models/users');
const Regions = require('../models/regions');
const RefreshTokens = require('../models/refreshTokens');
const mongoose = require('mongoose');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

//Authentication middleware;
//not directly used by router, but each request for data that requires authentication 
//needs to pass through this function first
module.exports.authenticateUser = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token) {
        //there is no token/authorization header
        return res.status(402)   
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            //the token is invalid
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}



module.exports.addNewUser = async(req, res, next) => {
    try {
        console.log("Enter signin server");
        let image = '';
        if (req.file) {
            image = req.file.filename;
        } else {
            image = '../../client/pictures/defaultIcon.png';
        }
        const newUser = {
            _id: new mongoose.Types.ObjectId,
            username: req.body.username,
			name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            image: image,
            unlockedRegions: [],
            admin: false
        };
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            bcrypt.hash(req.body.password, 10, (_err, hash) => {
                newUser.password = hash;
                User.create(newUser)
                    .then(user => {
                        res.status(200).json({msg: user.email + ' Registered!'});
                    })
                    .catch(err => {
                        res.send('error: ' + err);
                    })
            });
        } else {
            res.status(409).json({error: "User already exists"});
        }

    } catch (error) {
        next(error);
    }
}

//Helper function for logging in; name is self-explanatory
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '25min'
    })
}

//router.post(/token)
//Expects a post request with "token" in the body; this the current user's refresh token
//This function checks whether the refresh token is valid and generates a new 
//access token for the user
module.exports.checkToken = async(req, res, next) => {
    try {
        let refreshToken = req.body.token
        if(!refreshToken) {
            return res.sendStatus(402)
        }

        let valid = await RefreshTokens.find({token : refreshToken}).exec()
        if(valid.length === 0){
            return res.sendStatus(403)
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403)
            }
            const payload = {
                _id: user._id,
                email: user.email,
                username: user.username
            }
            //we've successfully given the user a new access token
            const accessToken = generateAccessToken(payload)
            res.json({accessToken : accessToken})
        })
    }
    catch (err) {
        next(err)
    }
}

//router.post(/auth):
//Basic authentication function; Gives the user an access + refresh token
module.exports.authUser = async(req, res, next) => {
    try {
        let uname = req.body.username;
        let pswd = req.body.password

        let users = await User.find({username: uname}).exec();

        if(users.length > 0) {
            console.log("Provera sifre")
            let user = users[0]
            //temporarily pausing password encoding for testing purposes
            //let isPasswordCorrect = await bcrypt.compare(pswd, user.password)
            let isPasswordCorrect = (pswd === user.password)
            if(isPasswordCorrect) {
               console.log("Sifra odgovarajuca")
               //Not sure if this is still neccessary since we're using JWT tokens
               /*
               user.loggedIn = true;
               await User.updateOne({username : uname},
                   {$set: user}
                   ).exec();*/                
                
                let payload = {
                    _id: user._id,
                    email: user.email,
                    username: user.username
                };

                let accessToken = generateAccessToken(payload)
                let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

                //inserting our new refresh token into collection
                //FIX: tokens aren't appearing in DB for whatever reason
                RefreshTokens.create({
                    _id : new mongoose.Types.ObjectId,
                    token : refreshToken
                }).then(token => {console.log("dodat token u bazu")}).catch(err => res.sendStatus(500))

               res.json({user : user, accessToken: accessToken, refreshToken: refreshToken}).status(201)
            }
            else {
                res.json({error : "Netacna lozinka!"}).status(401)
            }
        }
        else {
            res.json({error: "Nepoznato korisnicko ime!"}).status(401)

        }
    }
    catch (error) {
        next(error)
    }
}


//router.delete(/logout)
//Log-out function; Invalidates the user's refresh token
//TODO: Client-side logout 
module.exports.logOut = async (req, res, next) => {
    await RefreshTokens.deleteOne({token : req.body.token}, function (err) {
        if(err) {
            next(err)
        }
    });
    res.sendStatus(204)
}

module.exports.findUser = async(req, res, next) => {
    console.log("funkcija findUser")
    try {
        let uname = req.query.username
        //console.log(uname)
        const user = await User.findOne({
            username: uname
        });

        if(user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    _id: user._id,
                    email: user.email,
                    username : user.username
                };

                let token = jwt.sign(payload, 'token', {
                    expiresIn: 1440
                });

                res.json({
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    username: user.username,
                    image: user.image,
                    unlockedRegions: user.unlockedRegions
                }).status(200);

            } else {
                res.status(404).json({
                    error: "User does not exist"
                });
            }
        } else {
            res.status(404).json({
                error: "User does not exist"
            });

        }

    } catch (error) {
        next(error);
    }
}



module.exports.addRegionForUser = async(req, res, next) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({
            email: email
        });

        if (!user) {
            res.send("User not found").status(404);
        }

        const newRegion = await Regions.findById(req.body.id);
        for (let i = 0; i < user.unlockedRegions.length; i++) {
            if (user.unlockedRegions[i].id == req.body.id) {
                res.status(409).send("Region already added.");
                return;
            }
        }
        await user.updateOne(
            {
                $push: {
                    unlockedRegions: {
                        name: newRegions.name,
                        id: newRegions._id,
                        locked: false
                    }
                }
            }
        );

        res.json(user).status(200);

    } catch (error) {
        next(error);
    }
}


