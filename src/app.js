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

app.get("/user", async (req, res) => {
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

app.post("/userlogin", async (req, res) => {
    try {
        const result = await Userdata.find(req.body)
        console.log(result)
        if (result == '') {
            res.status(201);
            res.send({ message: "Login Failed" })
        } else {
            res.status(201);
            res.send({ token: result[0]._id, message: "Login Success" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.get("/user/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const result = await Userdata.findById({ _id });
        console.log(result);
        res.status(201);
        //res.send(result)
        res.send({
            username: result.username,
            name: result.name,
            level: result.level,
            profilepic: result.profileoic,
            profession: result.profession,
            skill: result.skill,
            message: "Data Fetched"
        })

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
        res.status(201).send({ message: "User is Created" });
    }

    catch (e) {
        res.status(400).send(e)
    }
})

app.put("/userupdate/:id", async (req, res) => {
    try {
        const _id = req.params.id
        console.log("id", _id)
        const updateUserdata = await Userdata.findByIdAndUpdate({ _id }, req.body, {
            new: true
        });
        console.log(updateUserdata)
        res.status(201).send({ message: "Userdata Updated Succesfully" });
    }

    catch (e) {
        res.status(400).send(e)
    }
})
app.delete("/userdelete/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const deleteUser = await Userdata.findByIdAndDelete({ _id });
        console.log(deleteUser)
        res.status(201).send({ message: "Userdata Deleted...!" });
    }

    catch (e) {
        res.status(400).send(e)
    }
})

//quiz api
app.get("/quiz", async (req, res) => {
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
app.get("/getquestion/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const result = await Quizdata.findById({ _id });
        res.status(201);
        res.send({
            question: result.question,
            optiona: result.optiona,
            optionb: result.optionb,
            optionc: result.optionc,
            optiond: result.optiond,
            answer: result.answer,
            message: "Data Fetched"
        })
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
        res.send({ message: "Added Successfully" })
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

app.put("/updatequestion/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const updateQuestion = await Quizdata.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        console.log(updateQuestion)
        res.status(201).send({ message: "Question Updated Succesfully" });
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
        res.send({ message: "Score Added Successfully" })
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})

//subject api
app.get("/getsubject", async (req, res) => {
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
        res.send({ message: "Subject Added Successfully" })
    }

    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.get("/getsubject/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Subject.findById({ _id })
        console.log(result)
        res.status(201);
        res.send({
            subjectid: result.subjectid,
            subjectname: result.subjectname,
            description: result.description,
            category: result.category,
        })
    }
    catch (err) {
        console.log(err)
        res.status(400);
        res.send(err)
    }
})
app.put("/updatesubject/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log("id", _id)
        const updateSubject = await Subject.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        console.log(updateSubject)
        res.status(201).send({ message: "Subject Updated Succesfully" });
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
