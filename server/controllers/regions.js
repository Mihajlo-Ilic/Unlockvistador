const User = require('../models/users');
const Regions = require('../models/regions');
const Questions = require('../models/questions');
const Comments = require('../models/comments');
const mongoose = require('mongoose');
const e = require('express');


module.exports.getRegion = async (req, res, next) => {
    try {
        const regionName = req.params.region_name;

        let regions = await Regions.find({name : regionName}).exec()
        if(regions.length === 0){
            res.status(404).json("Nema regiona sa imenom " + regionName)
            return
        }
        else {
            let region = regions[0]
            if (region.locked) {
                let regionId = region._id
                let questions = await Questions.find({region: regionId}).exec()
                if (questions.length === 0) {
                    res.status(404).json("Nema pitanja za region " + regionName)
                }
                else {
                    //biramo nasumicno pitanje
                    let question = questions[Math.floor(Math.random() * questions.length)]
                    //biramo 3 nasumicna pogresna odgovora
                    let false_answers = []
                    false_answers.push(question.false_answer1)
                    false_answers.push(question.false_answer2)
                    false_answers.push(question.false_answer3)
                    false_answers.push(question.false_answer4)
                    false_answers.push(question.false_answer5)
                    false_answers.push(question.false_answer6)

                    let false_answer_idxs = []
                    while (false_answer_idxs.length < 3) {
                        let n = Math.floor(Math.random() * 6)
                        if (!false_answer_idxs.includes(n))
                            false_answer_idxs.push(n)
                    }
                    res.json({
                        text: question.text,
                        answer: question.answer,
                        false_answer1: false_answers[false_answer_idxs[0]],
                        false_answer2: false_answers[false_answer_idxs[1]],
                        false_answer3: false_answers[false_answer_idxs[2]]
                    }).status(200);
                }

            }
            else {
                res.json({ message : region.facts[0] }).status(200)
            }

        }
    }
    catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getRegionFacts = async(req, res, next) => {
    try {
		const regionName = req.params.region_name;
        
        let regions = await Regions.find({name : regionName}).exec()
        if(regions.length === 0){
            res.status(404).json("Region not found!");
            return;
        }
        else {
            let region = regions[0]
            let msg = ""
            if(region.locked) {
                msg = "Nemate pristup regionu!"
                //ovde pozvati asinhroni zahtev ka kolekciji questions da se nadje pitanje za region
                //i pitanje vratiti kao msg
            }
            else {
                msg = region.facts[0]
            }
            res.json({message : msg}).status(200);
        }
        
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

module.exports.getRegionId = async(regionName) => {
    let regions = await Regions.find({name: regionName}).exec()
    if (regions.length === 0) {
        return -1
    }
    return regions[0]._id;
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
