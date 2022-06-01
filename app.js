const express = require("express");
const bodyParser = require("body-parser");
const cors =require("cors");
const app = express();
const mongoose = require("mongoose")
app.use(cors());
const carsRouter = require ("./routers/carsRouter")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/cars',carsRouter)

const CONNECTION_STRING = "mongodb+srv://ruslansabitov:xzsawq21@cluster0.erjud.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_STRING,
    function (err){
        if (err) return console.log (err);
        app.listen(8080);
    }
);

