const User = require('../models/users');
const Regions = require('../models/regions');
const mongoose = require('mongoose');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require('dotenv').config()

module.exports.authenticateUser = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(402)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403)
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

module.exports.authUser = async(req, res, next) => {
    try {
        let uname = req.body.username;
        let pswd = req.body.password

        let users = await User.find({username: uname}).exec();

        if(users.length > 0) {
            console.log("Provera sifre")
            let user = users[0]
            //K: temporarily pausing password encoding for testing purposes
            //let isPasswordCorrect = await bcrypt.compare(pswd, user.password)
            let isPasswordCorrect = (pswd === user.password)
            if(isPasswordCorrect) {
               console.log("Sifra odgovarajuca")
               req.session.loggedin = true;
               req.session.username = uname;

               user.loggedIn = true;
               await User.updateOne({username : uname},
                   {$set: user}
                   ).exec();

                const payload = {
                    _id: user._id,
                    email: user.email
                };

                let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: 1440
                });

               res.json({user : user, token: token}).status(201)
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
                    email: user.email
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


