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

const upload = multer({ storage: storage }).single('file');
// create a route for the app
app.post('/',function(req, res) {
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

        var sql = `INSERT INTO nifty (username, password, status, email, role, held, interest, bio, file, sha256) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.status}", "${req.body.email}", "${req.body.role}", "${req.body.held}", '${req.body.interest}', "${req.body.bio ? req.body.bio : ''}", "${req.body.fileName ? req.body.fileName : '' }", "${req.body.fileName ? req.body.fileName : ''}")`;
        con.query(sql, function (err, result) {
            if(err) throw err;
            console.log("Result: " + result)
        })
    })

	return res.status(200).send({ data: 'success' });
});

// make the server listen to requests
app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});