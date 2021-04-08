const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
	username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
	lastname: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },
	image: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    unlockedRegions: {
        type: [Object],
        require: true
    },
    admin: {
        type: Boolean,
        require: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
