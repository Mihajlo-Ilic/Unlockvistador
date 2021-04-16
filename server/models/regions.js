const mongoose = require('mongoose');

const regionsShema = mongoose.Schema({
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
		type: Array,
		require: true
	},
	locked: {
		type: Boolean,
		require: true
	}
});

const regionsModel = mongoose.model('Regions', regionsShema);
module.exports = regionsModel;
