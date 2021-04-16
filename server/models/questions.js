const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Regions",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const questionsModel = mongoose.model("Questions", questionsSchema)
module.exports = questionsModel