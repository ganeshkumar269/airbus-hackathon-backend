const express = require('express')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware.js')

const {registerUser, loginUser, getKeywords, addKeywords} = require('../controllers/admin.js')

const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

router.post('/login', loginUser)

router.post('/register',registerUser) 

router.get('/keywords',verifyTokenMiddleware, getKeywords)
router.post('/keywords',verifyTokenMiddleware, addKeywords)


module.exports = router

