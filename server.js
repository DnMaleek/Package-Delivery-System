const express = require('express');
const app = express();
const path = require('path')
const index = require("./src/routes/indexRoutes")
const login = require("./src/routes/loginRoutes")
const admin = require("./src/routes/adminRoutes")

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.use("/",index)
app.use("/login",login)
app.use("/admin",admin)

app.listen(5000,()=>{
    console.log("http://localhost:5000")
})