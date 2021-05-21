const express = require('express')
const widget = require('../controllers/widget.js')

const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

// router.get('/search', widget.handleSearch);

router.post('/feedback', widget.feedback)
router.post('/bugreport', widget.addBugReport)
// router.post('/login', widget.userLogin)
// router.post('/register', widget.userRegister)

module.exports = router