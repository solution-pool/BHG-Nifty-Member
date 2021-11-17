const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mysql = require('mysql')
const db = require('./config/db')

const app = express()

const port = 8000

app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors())

const con = mysql.createConnection(db)
    // con.connect(function (err) {
    //     if(err)  {
    //         throw err;
    //     }
    //     console.log('connected')

        // con.query(sql, function (err, result) {
        //     if(err) throw err;
        //     console.log("Result: " + result)
        // })
    // })

require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port)
})