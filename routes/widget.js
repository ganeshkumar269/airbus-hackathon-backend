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
// router.post('/register', widget.userRegister)
router.post('/newuserdetected',widget.newuserdetected)
router.post('/oldusersetcount',widget.oldusersetcount)
router.post('/addusertime',widget.addusertime)



module.exports = router

