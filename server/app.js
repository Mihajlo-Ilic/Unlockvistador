const express = require("express")
const app = express()
const bodyParser = require("body-parser")

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

app.use('/:ime_oblasti', function(req, res, next) {
    const ime_oblasti = req.params.ime_oblasti;

    if(req.method == "GET"){
        return res.status(200).json({poruka : ime_oblasti})
    }
});


app.use(function(req, res, next) {
    const error = new Error("Zahtev nije podrzan od servera")
    error.status = 405

    next(error)
})

app.use(function(error,req,res,next){
    res.status(error.status|| 500).json({greska: {poruka:error.message}});
})

module.exports = app
