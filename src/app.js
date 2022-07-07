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

app.post("/user", async (req, res) => {
    try {
        console.log(req.body);
        const reactUserdata = new Userdata(req.body);
        const createUser = await reactUserdata.save()
        res.status(201).send(createUser);
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
app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})
