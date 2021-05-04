const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const routerRegions = require("./routes/regions")
const routerUsers = require("./routes/users")

mongoose.connect("mongodb://127.0.0.1:27017/Unlockvistador", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function () {
  console.log('Successful connection to mongoose!');
});

mongoose.connection.on('error', (error) => {
  console.log('Error: ', error);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if(req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
        return res.status(200).json({});
    }

    next();
});

app.use('/', routerRegions);
app.use('/users', routerUsers);

app.use(function(req, res, next) {
    const error = new Error("Zahtev nije podrzan od servera")
    error.status = 405

    next(error)
})

app.use(function(error,req,res,next){
    res.status(error.status || 500).json({greska: {poruka:error.message}});
})

module.exports = app
