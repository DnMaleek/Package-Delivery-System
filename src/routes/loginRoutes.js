const express = require('express')
const router = express.Router();
const {getLogin} = require('../controllers/loginControllers')

router.get('/',getLogin);

module.exports = router ;