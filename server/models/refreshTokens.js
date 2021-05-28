const mongoose = require("mongoose")

const refreshTokensSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    token : {
        type: String,
        require : true
    }
})

const refreshTokensModel = mongoose.model('RefreshTokens', refreshTokensSchema);
module.exports = refreshTokensModel;