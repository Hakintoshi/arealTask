
var express = require("express");

var app = express();
var cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const {enCrypt, deCrypt} = require("./crypt")
const db = require('./db')


app.use(cors())
app.use(express.json())

app.get("/:link", async (req, res) => {
    try {
        const search = await db.query(`SELECT * FROM secretlink WHERE uniquelink = $1`, [req.params.link])
        const { hash } = search.rows[0]
        res.send(deCrypt(hash))
    } catch (error) {
        console.log(error)
    }
})

app.post("/", async (req, res) => {
    let { secret } = req.body 
    let encrypted = enCrypt(secret)
    const uniqId = uuidv4()
    const newLink = await db.query(`INSERT INTO secretlink (uniquelink, hash) values ($1, $2) `, [uniqId, encrypted])
    res.send(`http://localhost:3000/${uniqId}`)
})










app.use(function(req, res) {
    res.status(404).send("not found")
})

app.listen(3000, () => {
    console.log("start 3000")
})