const mongoose = require("mongoose");
const validator = require("validator");

const subjectSchema = new mongoose.Schema({

    subjectid: String,
    subjectname: {
        type: String,
        required: true,
        unique : true
    },
    description: String,
    category: String,

})

//collection

const Subject = new mongoose.model("subject", subjectSchema);

module.exports = Subject