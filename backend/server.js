const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mysql = require('mysql')
const db = require('./config/db')
const fs = require('fs')

const app = express()

const port = 8000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())



app.post('/', (req, res) => {
    const con = mysql.createConnection(db)
    con.connect(function (err) {
        if(err)  {
            throw err;
        }
        console.log('connected')

        const file = req.body.file
        console.log(req.file)

        var sql = `INSERT INTO nifty (username, password, status, email, role, held, interest, bio, file, sha256) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.status}", "${req.body.email}", "${req.body.role}", "${req.body.held}", "${req.body.interest}", "${req.body.bio}", "${req.body.file}", "${req.body.sha256}")`;
        con.query(sql, function (err, result) {
            if(err) throw err;
            console.log("Result: " + result)
        })
    })
    res.send('Hello')
})

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port)
})