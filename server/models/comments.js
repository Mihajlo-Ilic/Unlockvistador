const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Regions",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

const commentModel = mongoose.model("Comments", commentSchema)
module.exports = commentModel