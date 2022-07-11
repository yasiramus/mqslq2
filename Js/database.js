const express = require('express');
const mysql2 = require('mysql2');

//declaring a variable and equating it to the express function
const app = express();

//using of middlewarea
app.use(express.json());//req.body
app.use(express.urlencoded({ extended: true }));//allow us to pass data
const PORT = process.env.PORT || 7500;//setting the port number

//this responsible for connecting to the mysql server
//creating connection
const mysqlConnection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sira211818@@@',//password of mysql user that is if set provide it else leave the space empty string
    database: ''//name of database to use for the connection
});

//implementing the connection message using the .connect method
mysqlConnection.connect((err, success) => {
    if (success) {
        console.log('mysql connection has been establisheed successfully')
    }
    else {
        console.log(err.message);
    }
});

// app.get('/', (req, res) => {
//     mysqlConnection.query('CREATE DATABASE yasiraSampleDb', (err, success) => {
//         if (err) {
//             throw err.message
//         }
//         if (success) {
//             console.log('Database has been created successful')
//             res.send({ message: 'created' })

//         }
//     })
// });

const tableName = `CREATE TABLE sample(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50),
    password VARCHAR(20),
    location VARCHAR(100),
    dept VARCHAR(100),
    is_admin TINYINT(1),
    register_date DATETIME,
    PRIMARY KEY(id)
)`
// app.get('/createtable', (req, res) => {    
  
//     mysqlConnection.query(tableName, (err, success) => {
//         if (err) {
//             throw err.message
//         }
//         if (success) {
//             res.send({message:'table successfully created'})
//         }
//     })
// })


app.get('/', (req, res) => {
    mysqlConnection.query('CREATE DATABASE ayisah', (err, success) => {
        if (err) {
            throw err.message
        }
        if (success) {
            mysqlConnection.query('use ayisah',(err,success)=>{
                if(err){
                    throw err.message
                }
                if(success){
                    mysqlConnection.query(tableName,(err,success)=>{
                        if(err){
                            throw err
                        }
                        if(success){

                            console.log('table has been created successful')
                            res.send({ message: 'created' })
                        }
                    })
                }
            })

        }
    })
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
