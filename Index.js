const express = require('express');
const cors = require('cors');
const Data = require('./Schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(URI)
    .then(() => console.log("Connected Successfully"))
    .catch(err => console.log(err))

// http://localhost:8080/add-data

app.post("/add-data", async (req, res) => {
    const data = req.body;
    try {
        const resp = await Data.findOne({ email: data.email });
        if (resp) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        else {
            const entry = new Data(data);
            entry.save();
            return res.status(200).json({ msg: "Added Succesfully" });
        }
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:8080/get-data

app.get("/get-data", async (req, res) => {
    const data = await Data.find();
    res.json(data);
})

// http://localhost:8080/update-data

app.post("/update-data", async (req, res) => {
    const { data, oldEmail } = req.body;
    try {
        const resp = await Data.findOne({ email: data.email });
        if (resp) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        else {
            await Data.findOneAndUpdate({ email: oldEmail.email }, data)
                .then(() => res.status(200).json({ msg: "Updated Succesfully" }))
                .catch(() => res.status(500).json({ msg: "Updation failed" }))
        }
    } catch (error) {
        console.log(error)
    }
})

// http://localhost:8080/delete-data

app.post("/delete-data", async (req, res) => {
    const email = req.body.email;
    await Data.findOneAndDelete({ email })
        .then(res.send("deleted"))
        .catch(err => console.log(err))
})


app.listen(PORT, () => {
    console.log("Server running on port:", PORT)
})