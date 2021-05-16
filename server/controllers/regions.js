const User = require('../models/users');
const Regions = require('../models/regions');
const mongoose = require('mongoose');


module.exports.getRegionFacts = async(req, res, next) => {
    try {
        
		const regionName = req.params.region_name;
        
        let region = await Regions.find({name : regionName}).exec()
        if(region.length === 0){
            res.status(404).json("Region not found!");
            return;
        }
        else{
            res.json({poruka : region[0].facts}).status(200);
        }
        
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

