const express = require('express')
const router = express.Router();
const {getIndex} = require('../controllers/indexControllers')

router.get('/',getIndex);

module.exports = router ;