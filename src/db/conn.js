const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ronak:ronakmongo@cluster0.5lig2.mongodb.net/quiz?retryWrites=true&w=majority")
    .then(() => console.log("Connected..."))
    .catch((err) => console.log(err))
