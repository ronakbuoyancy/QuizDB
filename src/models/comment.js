const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

//collection

const Comment = new mongoose.model("comment", CommentSchema);

module.exports = Comment