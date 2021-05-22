const express = require('express')
const widget = require('../controllers/widget.js')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware.js')

const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

// router.get('/search', widget.handleSearch);

router.post('/feedback', verifyTokenMiddleware, widget.feedback)
router.post('/bugReport', verifyTokenMiddleware, widget.addBugReport)
router.get('/announcement', verifyTokenMiddleware, widget.getAnnouncement)
router.post('/login', widget.userLogin)
router.post('/newUserDetected', verifyTokenMiddleware, widget.newUserDetected)
// router.post('/register', widget.userRegister)

module.exports = router

