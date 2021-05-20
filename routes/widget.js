const express = require('express')
const widget = require('../controllers/widget.js')

const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

// router.get('/search', widget.handleSearch);

router.post('/feedback', widget.feedback)

module.exports = router