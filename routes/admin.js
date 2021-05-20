const express = require('express')

const {registerUser, loginUser, getKeywords, addKeywords} = require('../controllers/admin.js')

const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

router.post('/login', loginUser)

router.post('/register',registerUser) 

router.get('/keywords', getKeywords)
router.post('/keywords', addKeywords)

module.exports = router