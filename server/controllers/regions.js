const User = require('../models/users');
const Regions = require('../models/regions');
const mongoose = require('mongoose');


let getRegionFacts = async(req, res, next) => {
    try {
		const regionName = req.params.name;
        const region = await Regions.find({
			name: regionName
		});
        if(region.length === 0){
            res.send("Region not found.").status(404);
            return;
        }
        else{
            res.json(region.facts).status(200);
        }
        
    } catch (error) {
        next(error);
    }
}

