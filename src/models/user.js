const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // type: {
    //     type: String,
    //     required: true
    // }
    username:String,
    password:String,
    type:String,
    level:String,
    name:String

})

//collection

const Userdata = new mongoose.model("user", userSchema);

module.exports = Userdata