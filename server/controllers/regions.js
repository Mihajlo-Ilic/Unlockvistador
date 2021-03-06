const User = require('../models/users');
const Regions = require('../models/regions');
const Questions = require('../models/questions');
const Comments = require('../models/comments');
const mongoose = require('mongoose');
const e = require('express');


async function getRegionId(regionName) {
    let regions = await Regions.find({name: regionName}).exec()
    if (regions.length === 0) {
        return -1
    }
    return regions[0]._id;
}

module.exports.getRegionComments = async (req, res, next) => {
    try {
        let regionName = req.query.regionName
        
        let regions = await Regions.find({name : regionName}).exec()
        if (regions.length === 0) {
            res.status(404).json("Nema regiona sa imenom " + regionName)
        }
        else {
            let region = regions[0]
            let regionId = region._id

            let comments = await Comments.find({region : regionId}).exec()
            let commentsObjects = []
            for(i = 0; i < comments.length; i++) {
                //naci username 
                let usr = await User.find({_id : comments[i].user}).exec()
                let uname = usr[0].username
                let comm = {
                    "username" : uname,
                    "comment" : comments[i].comment
                }
                commentsObjects.push(comm)
            }

            res.status(201).json({commentsObjects});
        }
    }
    catch(error) {
        next(error)
    }
}

module.exports.getRegionQuestion = async (req, res, next) => {
    try {
        //uzimamo nasumicno pitanje za region
        let regionName = req.query.regionName;

        //1. uzimamo id regiona
        let rid = await getRegionId(regionName)
        
        if (rid === -1) {
            return res.status(500).json("Greska u bazi! Kliknut region nije pronadjen")
        }

        //2. uzimamo pitanja za region
        let regionQuestions = await Questions.find({region : rid}).exec()
        if (regionQuestions.length === 0) {
            return res.status(404).json("Nisu dodata pitanja za ovaj region")
        }

        //3. od njih nasumicno biramo jedno i saljemo klijentu
        let question = regionQuestions[Math.floor(Math.random() * regionQuestions.length)]

        return res.status(201).json(question)
    }
    catch (err) {
        next(err)
    }
}


module.exports.addComment = async(req, res, next) => {
    //console.log("Primljen komentar " + req.body.comment + "za oblast " + req.body.regionName + "od korisnika " + req.body.uname)
    try {
        let users = await User.find({username : req.user.username}).exec()
        if(users.length === 0) {
            res.status(500).json("Greska u bazi - Trenutno ulogovan korisnik nije u bazi");
        }
        let uid = users[0]._id;
        
        let regions = await Regions.find({name : req.body.regionName}).exec()
        if (regions.length === 0) {
            res.status(500).json("Greska u bazi - Kliknut region nije u bazi")
        }

        let rid = regions[0]._id

        const newComment = {
            _id : new mongoose.Types.ObjectId,
            region : rid,
            user : uid,
            comment : req.body.comment
        }

        Comments.create(newComment).
        then(comment => {res.status(200).json({msg: "dodat komentar" + comment.comment})})
            .catch(err => {
                res.send('error' + err);
            })
    
    }
    catch(error) {
        next(error)
    }
}


// if the test is completed then we are unlocking the region for user
// patch request
module.exports.unlockRegion = async(req,res,next) => {
    try {
        const regionName = req.params.region_name;
        let regions = await Regions.find({name : regionName}).exec()
        if(regions.length === 0){
            res.status(404).json("Nema regiona sa imenom " + regionName)
            return
        } else {
            let region = regions[0];
            let id = region._id;
            updateOptions["locked"] = true;
            Regions.updateOne(
                {_id : id },
                { $set : updateOptions },
                function(err,raw) {
                    if(err) {
                        return res.status(500).json({message:err})
                    }
                    res.status(200).json({message : "The region is unlocked"});
                }
            );
        }   
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getRegionFacts = async(req, res, next) => {
    try {
		const regionName = req.query.regionName;
        console.log(regionName)
        let regions = await Regions.find({name : regionName}).exec()
        if(regions.length === 0){
            
            res.status(404).json("Region not found!");
            return;
        }
        else {
            let region = regions[0]
                //ovde pozvati asinhroni zahtev ka kolekciji questions da se nadje pitanje za region
                //i pitanje vratiti kao msg
                // we are getting random fact and a picture
                let numOfFacts = region.facts.length;
                let randomNum = Math.floor(numOfFacts * Math.random())
                msg = region.facts[randomNum];
                let numOfPictures = region.image.length;
                randomNum = Math.floor(numOfPictures * Math.random())
                let msg2 = region.image[randomNum]
                console.log("UZELI SMO SLIKU: " + msg2)
                res.json({fact : msg, picture : msg2}).status(200);
            }     
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}


module.exports.getQuestion = async(req, res, next) => {
    try {
        const regionName = req.params.region_name;
        
        let regionId = await this.getRegionId(regionName);
        if(regionId === -1) {
            res.status(404).json("Nije pronadjen ID regiona s tim imenom")
        }
        let questions = await Questions.find({region: regionId}).exec();
        if (questions.length === 0) {
            res.status(404).json("Nema pitanja za ovaj region!");
        }
        else {
            //nasumicno biramo pitanje
            let question = questions[Math.floor(Math.random() * questions.length)]
            let msg = question.text
            res.json({message : msg}).status(200)
        }
    } catch (error) {
        console.log(error.message)
        next(error)
    }    
}
// G : this module is made for adding question in database from client
module.exports.inputQuestion = async(req,res,next) => {
    console.log("I AM AT CONTROLERS")
    try {
        let admin = true;
        let text = req.body.text;
        let answer = req.body.answer;
        let false_answer1 = req.body.false_answer1;
        let false_answer2 = req.body.false_answer2;
        let false_answer3 = req.body.false_answer3;
        let false_answer4 = req.body.false_answer4;
        let false_answer5 = req.body.false_answer5;
        let false_answer6 = req.body.false_answer6;
        console.log(text)
        let regionId = await getRegionId(req.body.regionName);
        if(regionId === -1) {
            res.status(404).json("Nije pronadjen ID regiona s tim imenom")
        } else {
            const newQuestion = {
                _id : new mongoose.Types.ObjectId,
                region : regionId,
                text : text,
                answer : answer,
                false_answer1 : false_answer1,
                false_answer2 : false_answer2,
                false_answer3 : false_answer3,
                false_answer4 : false_answer4,
                false_answer5 : false_answer5,
                false_answer6 : false_answer6,
            }
            if(admin == true) {
                Questions.create(newQuestion)
                .then(user => {
                    res.status(200).json({poruka : 'Added question!'});
                })
                .catch(err => {
                    res.send('error: ' + err);
                    console.log(err.message)
                });
            } else {
                res.status(409).json({error: "This question is not beeing added by admin"});
            }
        }

    } catch(error) {
        console.log(error.message)
        next(error)        
    }
}