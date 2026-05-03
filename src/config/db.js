const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host:process.env.MYSQLHOST,
    port:process.env.MYSQLPORT,
    user:process.env.MYSQLUSER,
    password:process.env.MYSQLPASSWORD,
    database:process.env.MYSQL_DATABASE,
})

db.connect((error)=>{
    if(error){
        console.error("Database connection Failed")
        return
    }

    console.log("Mysql connected sucessfully")
})

module.exports=db;

