const express = require('express');
const mysql = require('mysql');
require('dotenv').config()

const app = express();

const myDB = mysql.createConnection({
    host: process.env.DBhost,
    port: process.env.DBport,
    user:  process.env.DBuser,
    password:  process.env.DBpassword
});

myDB.connect(function (err) { 
    if (err) throw err;
    console.log("Connection succeeded .");
});


app.post('/signIn', function (req, res) {
    const { fName, lName } = req.body
    const sql = "INSERT INTO Users (first-name, last-name) VALUES (?, ?)"
    myDB.query(sql, [fName, lName], (err, res) => {
        if (err) throw err
        res.send({
            state: true,
            message : "User is registed ."
        })
    })
});

app.get('/logIn', function (req, res) {
    const { fName, lName } = req.body
    const sql = "select * from Users where first-name = ? && last-name = ? "

    myDB.query(sql, [fName, lName], (err, data) => {
        if (err) throw err
 
        if (data.length) return res.send({
            state: true,
            user: {
                ...data
            }
        })
        console.log("USER NOT EXISTS !")
    }
    )
});

app.listen(3000);