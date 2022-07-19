const mongoose = require("mongoose");
const validator = require("validator");

const scoreSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    score: Number,
    timestamp : Number 
})

//collection

const Scoredata = new mongoose.model("scoredata", scoreSchema);

module.exports = Scoredata