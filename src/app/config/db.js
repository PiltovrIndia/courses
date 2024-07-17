const mysql = require("mysql");

const db = mysql.createConnection({
    // host: "13.126.186.175",
    // user: "vander",
    // password: "Vander@33",
    // database: "courses"
    host: "localhost",
    user: "root",
    password: "",
    database: "courses"
    // app_port:"22",
    // port:"3306",
    // host:"13.126.186.175",
    // user:"coursesadmin",
    // password:"Courses@33",
    // database:"courses"
});

db.connect(err =>{
    if(err)
        console.error("Error connecting to MySQL database",err);
    else
        console.log("Connected to MySQL database");
});

module.exports = db;
// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.MYSQL_DB,
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10,
//     idleTimeout: 60000,
//     queueLimit: 0,
// });

// async function checkConnection() {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Connected to the database.');
//         connection.release();  // Release the connection back to the pool
//     } catch (err) {
//         console.error('Unable to connect to the database:', err);
//     }
// }

// checkConnection();

// export default pool;
