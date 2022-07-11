const express = require("express");
require("./db/conn")
const Quizdata = require("./models/quiz")
const Userdata = require("./models/user")
const Scoredata = require("./models/score")
const Subject = require("./models/subject")

const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors')

// app.get("/", (req, res) => {
//     res.send("Hello from backend")
// })
app.use(express.json());
app.use(cors())
//user api

app.get("/user", async(req, res) => {
    try {
        const result = await Userdata.find()
        console.log(result)
        res.status(201);
        res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.post("/userlogin", async(req, res) => {
    try {
        const result = await Userdata.find(req.body)
        console.log(result)
        if(result == ''){
            res.status(201);
            res.send("Login Failed")
        }else{
            res.status(201);
            res.send("Login Success")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.post("/usersignup", async (req, res) => {
    try {
        console.log(req.body);
        const reactUserdata = new Userdata(req.body);
        const createUser = await reactUserdata.save()
        res.status(201).send("User is Created");
    }

    catch (e) {
        res.status(400).send(e)
    }
})

app.patch("/userupdate/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const updateUserdata = await Userdata.findByIdAndUpdate({_id}, req.body,{
            new:true
        });
        console.log(updateUserdata)
        res.status(201).send("Userdata Updated Succesfully");
    }

    catch (e) {
        res.status(400).send(e)
    }
})
app.delete("/userdelete/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const deleteUser = await Userdata.findByIdAndDelete({_id});
        console.log(deleteUser)
        res.status(201).send("Userdata Deleted...!");
    }

    catch (e) {
        res.status(400).send(e)
    }
})

//quiz api
app.get("/quiz", async(req, res) => {
    try {
        const result = await Quizdata.find()
        console.log(result)
        res.status(201);
        res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.post("/getquestion", async (req, res) => {
    try {
        console.log(req.body);
        const quizdata = await Quizdata.find(req.body);
        res.status(201);
        res.send(quizdata)
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.post("/addquestion", async (req, res) => {
    try {
        console.log(req.body);
        const quetion = new Quizdata(req.body);
        const newquetion = await quetion.save()
        res.status(201);
        res.send("Added Successfully")
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.patch("/updatequestion/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const updateQuestion = await Quizdata.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        console.log(updateQuestion)
        res.status(201).send("Question Updated Succesfully");
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

//score api
app.post("/getscore", async (req, res) => {
    try {
        console.log(req.body);
        const score = await Scoredata.find(req.body);
        res.status(201);
        res.send(score)
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.post("/savescore", async (req, res) => {
    try {
        console.log(req.body);
        const score = new Scoredata(req.body);
        const savescore = await score.save()
        res.status(201);
        res.send("Score Added Successfully")
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

//subject api
app.get("/getsubject", async(req, res) => {
    try {
        const result = await Subject.find()
        console.log(result)
        res.status(201);
        res.send(result)
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.post("/savesubject", async (req, res) => {
    try {
        console.log(req.body);
        const new_subject = new Subject(req.body);
        const subject = await new_subject.save()
        res.status(201);
        res.send("Subject Added Successfully")
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.patch("/updatesubject/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const updateSubject = await Subject.findByIdAndUpdate(_id, req.body,{
            new:true
        });
        console.log(updateSubject)
        res.status(201).send("Subject Updated Succesfully");
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})
