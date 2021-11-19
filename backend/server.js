// import express (after npm install express)
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const mysql = require('mysql')
const db = require('./config/db')

// create new express app and save it as "app"
const app = express();

// server configuration
const PORT = 8000;

app.use(cors());

if (!fs.existsSync('resources')){
    fs.mkdirSync('resources');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'resources')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})


// create a route for the app
app.post('/',function(req, res) {
    const upload = multer({ storage: storage }).single('file');

    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err)
        }
    })
    const con = mysql.createConnection(db)

    con.connect(function (err) {
        if(err)  {
            return res.status(500).json(err)
        }

        let sql = "CREATE TABLE IF NOT EXISTS `nifty` (" +
        "`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," + 
        "`username` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`password` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`status` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`email` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`role` varchar(255) CHARACTER SET utf8 DEFAULT NULL," + 
        "`held` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`interest` text CHARACTER SET utf8," +
        "`bio` text CHARACTER SET utf8," +
        "`file` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
        "`sha256` varchar(255) CHARACTER SET utf8 DEFAULT NULL)"
        con.query(sql, function (err, result) {
            if(err) throw err;
        })

        let isUpdate = false
        con.query(`SELECT username FROM nifty WHERE username = "${req.body.username}"`, function (err, result) {
            if(result) {
                isUpdate = true
            }
        })

        console.log(isUpdate)
        if(isUpdate) {
            console.log(req.body)
            return
            sql = `UPDATE nifty SET username = "${req.body.username}", password = "${req.body.password}" , status = "${req.body.status}", email = "${req.body.email}", role = "${req.body.role}", held = "${req.body.held}", interest = '${req.body.interest}', bio = "${req.body.bio ? req.body.bio : ''}", file = "${req.body.fileName ? req.body.fileName : '' }", sha256 = "${req.body.fileName ? req.body.fileName : ''}" WHERE username = "${req.body.username}"`;
            
            con.query(sql, function (err, result) {
                if(err) throw err;
            })
        } else {
            sql = `INSERT INTO nifty (username, password, status, email, role, held, interest, bio, file, sha256) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.status}", "${req.body.email}", "${req.body.role}", "${req.body.held}", '${req.body.interest}', "${req.body.bio ? req.body.bio : ''}", "${req.body.fileName ? req.body.fileName : '' }", "${req.body.fileName ? req.body.fileName : ''}")`;
            
            con.query(sql, function (err, result) {
                if(err) throw err;
            })
        }
        
        con.query(sql, function (err, result) {
            if(err) throw err;
        })
    })

	return res.status(200).send({ data: 'success' });
});

app.post('/get',function(req, res) {
    const upload = multer({ storage: storage }).single('file');

    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json(err)
        }
    })
    // const upload = multer({ storage: storage }).single('file');
    const con = mysql.createConnection(db)
    con.connect(function (err) {
        if(err)  {
            return res.status(500).json(err)
        }

        let sql = "CREATE TABLE IF NOT EXISTS `nifty` (" +
            "`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT," + 
            "`username` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`password` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`status` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`email` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`role` varchar(255) CHARACTER SET utf8 DEFAULT NULL," + 
            "`held` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`interest` text CHARACTER SET utf8," +
            "`bio` text CHARACTER SET utf8," +
            "`file` varchar(255) CHARACTER SET utf8 DEFAULT NULL," +
            "`sha256` varchar(255) CHARACTER SET utf8 DEFAULT NULL)"

        con.query(sql, function (err, result) {
            if(err) throw err;
        })
        con.query(`SELECT * FROM nifty WHERE username = "${req.body.username}"`, function (err, result) {

            if(err) throw err;
	        return res.status(200).send(result);
        })
    })
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});