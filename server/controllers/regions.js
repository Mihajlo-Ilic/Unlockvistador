const User = require('../models/users');
const Regions = require('../models/regions');
const Questions = require('../models/questions')
const mongoose = require('mongoose');
const e = require('express');


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
