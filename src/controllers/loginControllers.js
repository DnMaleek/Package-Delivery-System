const path = require('path')

const getLogin = (req,res)=>{
    res.sendFile(path.join(__dirname,'../../public','login.html'))
}

module.exports = {getLogin};