const mongoose = require('mongoose');

const regionsShema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        require : true
    },
    image: {
        type: Array,
        require: false
    },
    facts: {
		type: Array,
		require: true
	},
	locked: {
		type: Boolean,
		require: true
	},
});

const regionsModel = mongoose.model('Regions', regionsShema);
module.exports = regionsModel;
