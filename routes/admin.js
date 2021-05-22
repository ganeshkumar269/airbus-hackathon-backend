const express = require('express')
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware.js')


const {registerUser, loginUser, getKeywords, addKeywords, addAnnouncement,handleAddQna,usercountdetails,averagecountdetails,averagetimedetails} = require('../controllers/admin.js')


const router = express.Router();

router.get('/', (req, res)=> res.status(200).send("Hello World"))

router.post('/login', loginUser)

router.post('/register',registerUser) 

router.get('/keywords',verifyTokenMiddleware, getKeywords)
router.post('/keywords',verifyTokenMiddleware, addKeywords)


router.post('/announcement', verifyTokenMiddleware, addAnnouncement)

router.post('/addqna',handleAddQna)

router.get('/usercountdetails',usercountdetails)
router.get('/averagecountdetails',averagecountdetails)
router.get('/averagetimedetails',averagetimedetails)


module.exports = router

