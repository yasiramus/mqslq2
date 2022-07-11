//importing or requiring the express framework
const express = require('express');

//importing or requiring the mysql2 module 
const mysql2 = require('mysql2');

//declaring a variable and equating it to the express function
const app = express();

//using of middlewarea
app.use(express.json());//req.body
app.use(express.urlencoded({ extended: true }));//allow us to pass data
const PORT = process.env.PORT || 7000;//setting the port number

//this responsible for connecting to the mysql server
//creating connection
const mysqlConnection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sira211818@@@',//password of mysql user that is if set provide it else leave the space empty string
    database: 'album'//name of database to use for the connection
});

//implementing the connection message using the .connect method
mysqlConnection.connect((err, success) => {
    // if (success) {
    //     console.log('mysql connection has been establisheed successfully')
    // }
    // else{
    //     console.log(err.message);
    // }
    //implementing the ternary operator
    success ? console.log('mysql connection has been established successfully'):console.log(err.message);
});

//fetching or getting all data
app.get('/:tablename', (req, res) => {
    //to fetch from unknown data table
    const unknown = req.params.tablename;
    mysqlConnection.query('SELECT * FROM ' + unknown, (err, result) => {
        //implementing the ternary operator
        result ? res.send(result) : console.log(err.message);
        // console.log(result);
    })
});

//saving or sending data to the database
app.post('/create', (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const label = req.body.label;
    const released = req.body.released;
    mysqlConnection.query('INSERT INTO album(title,artist,label,released)values(?,?,?,?)',
        [title, artist, label, released], (err, result) => {
            //implementing the ternary operator
            result ? res.send(result) : console.log(err.message)
        })
});

//fetching or getting a single data using the id
app.get('/single-data/:tablename/:id', (req, res) => {
    const id = req.params.id;
    const unknown=req.params.tablename;
    // const unknown = req.params.tablename;
    //the id=? means that we are not hardcoding the id value
    mysqlConnection.query(`SELECT * FROM ${unknown} WHERE id=?`, id, (err, result) => {
        //implementing the ternary operator
        result ? res.send(result) : console.log(err.message);
    })
});


//updating data at the backend using the id
app.put('/update/:id', (req, res) => {
    const title = req.body.title;
    const artist = req.body.artist;
    const label = req.body.label;
    mysqlConnection.query('UPDATE album SET title=?, artist=?, label=? WHERE id=?', [title, artist, label, req.params.id],
        (err, result) => {
            result ? res.send(result) : console.log(err.message)
        })
});

//deleting a  single row data at the backend using the id
app.delete('/:id', (req, res) => {
    const id = req.params.id;
    mysqlConnection.query('DELETE FROM album WHERE id=?', id, (err, result) => {
        result ? res.send(result) : console.log(err.message)
    })
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});