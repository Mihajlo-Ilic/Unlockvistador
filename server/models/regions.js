const mongoose = require('mongoose');

const regionsShema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        require : true
    },
    image: {
        type: String,
        require: true
    },
    facts: {
		type: String,
		require: true
	},
	locked: {
		type: Boolean,
		require: true
	}
});

const seriesModel = mongoose.model('Regions', regionsShema);
module.exports = regionsModel;
