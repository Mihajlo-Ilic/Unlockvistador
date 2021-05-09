const User = require('../models/users');
const Regions = require('../models/regions');
const mongoose = require('mongoose');
const session = require('express-session')
const bcrypt = require("bcrypt");

module.exports.addNewUser = async(req, res, next) => {
    try {
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
        let email = req.body.email;
        let pswd = req.body.password

        let users = await User.find({email: email}).exec();

        if(users.length > 0) {
            console.log("Provera sifre")
            let user = users[0]
            let isPasswordCorrect = await bcrypt.compare(pswd, user.password)
            if(isPasswordCorrect) {
               console.log("Sifra odgovarajuca")
               req.session.loggedin = true;
               req.session.email = email;

               user.loggedIn = true;
               //K: TODO: ovde treba preusmeravanje na home stranicu; moram da testiram sa klijentske strane
                // dakle nekakav res.redirect(...)
            }
            else {
                res.send("Netacna lozinka!")
            }
        }
        else {
            res.send("E-mail nije prepoznat")
        }

    }
    catch (error) {
        next(error)
    }
}

module.exports.findUser = async(req, res, next) => {
    console.log("funkcija findUser")
    try {
        const user = await User.findOne({
            email: req.body.email
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

