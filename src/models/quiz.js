const mongoose = require("mongoose");
const validator = require("validator");

const quizSchema = new mongoose.Schema({
    subject: String,
    qid: Number,
    question: {
        type: String,
        required: true
    },
    optiona: String,
    optionb: String,
    optionc: String,
    optiond: String,
    answer: {
        type: String,
        required: true
    }
})

//collection

const Quizdata = new mongoose.model("quizdata", quizSchema);

module.exports = Quizdata

// const createDocument = async () => {
//     try{
//         const reactQuizdata =  new Quizdata({
//             subject:"React Js",
//             qid:102,
//             question:"What is react?",
//             optiona: "java script",
//             optionb: "java",
//             optionc: "programming language",
//             optiond: "machine code",
//             answer: "optiona"
//         })

//         const result = await reactQuizdata.save();
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// const getDocument  = async () => {
//     try{
//         const result = await Quizdata.find({subject:"React Js"})
//         .select({question:1})
//         console.log(result)
//     }
//     catch(err){
//         console.log(err)
//     }
    
// }

//createDocument();

// getDocument();