const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {v4:uuidv4} = require('uuid')

const logger = require('../util/loggermodule')
const dbConn = require('../db/getDbConn').getDbConn;
const addQna = require('../util/addQna')


const loginUser = async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    if(email==null || password==null){
        logger.error("No login data")
        res.status(404).send({"msg": "Data is Missing"})
    }else {        
        const client = await dbConn();
        const database = client.db("ahd")
        const users = database.collection("users")

        const user = await users.findOne({email: email})
        if(user!=null){
            const passwordMatch = await bcrypt.compare(req.body.password, user.password)

            if(passwordMatch){
                logger.info("User logged In")
                let token = jwt.sign({user:user}, "secret")
                res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                res.status(200).json({"token":token,"website_id":user.website_id});

                
            }else {
                res.status(404).json({"msg": "User name or password is wrong"})
            }
        }else{
            res.status(404).json({"msg": "User name or password is wrong"})
        }
    }

}

const registerUser = async function(req, res) {
    const email = req.body.email
    const password = req.body.password
    if(email==null || password==null){
        logger.error("No login data")
        res.status(404).send({"msg": "Data is Missing"})
    } else {
        isPresent = await checkIfUserAlreadyPresent(req.body.email)
        if(isPresent){
            logger.info("User already present")
            res.status(404).json({"msg": "User already present"})
        }else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 9)
                const user = {
                    email: req.body.email,
                    password: hashedPassword,
                    website_id: uuidv4() 
                }
    
                const client = await dbConn();
                const database = client.db("ahd")
                const users = database.collection("users")
    
                const result = await users.insertOne(user)
    
                if(result){
                    res.status(200).json({"msg":"User created Successfully"})
                }else {
                    res.status(500).json({"error": err.message})
                }
            } catch (error) {
                logger.error(error.message)
            }

        }
    }
}

const getFeedbacks = function(req, res) {

}

const getKeywords = async function(req, res) {

    const websiteId = req.query.website_id
    // logger.info(req.body.website_id)
    logger.info(websiteId)
  
    if(websiteId == null){
        logger.error("website_id not present")
        res.send(403)
    }
    else {
        const client = await dbConn();
        const database = client.db("ahd")
        const keywords = database.collection("keyword_table")

        const keywordsData = await keywords.findOne({website_id: websiteId})

        res.status(200).send(keywordsData)
        // if(keywordsData){
        //     // const keyword_arr = keywordsData.keywords
        // } else {
        //     logger.info("website id donot match")
        //     res.status(404).send({"msg":"website id donot match"})
        // }
    }
}

const addKeywords = async function(req, res) {
    const websiteId = req.body.website_id;
    const keywords = req.body.keywords;
    if(websiteId == null || keywords==null){
        logger.error("website_id or keywords not present")
        res.send(403)
    } else {
        try {
            const client = await dbConn();
            const database = client.db("ahd")

            const keywordCollection = database.collection("keyword_table")
            // const website_keywords = database.collection("website_keywords")

            // const keywordsData = await keywordCollection.findOne({website_id: websiteId})

            await keywordCollection
            .updateOne({website_id:websiteId},{$set:keywords},{upsert:true})
            // keywordsArray = []

            // keywords.forEach((d) => {
            //     // console.log(d)
            //     const url = d.url
            //     const keyword = d.keywords
            //     keyword.forEach((k) => {
            //         // console.log(k,url)
            //         keywordsArray.push(k)

            //         var addToSet = {};
            //         addToSet[k] = url
            //         keywordCollection.updateOne(
            //             {website_id:websiteId}, 
            //             {$addToSet : addToSet },
            //             {upsert: true}
            //             )
            //     })
            // })

            res.status(200).send({"msg":"keywords added"});

            // let result
            // if(keywordsData){
            //     result = await keywordCollection.updateOne(
            //         {website_id: websiteId}, {$addToSet: { keywords: {$each:keywords}}}
            //         )
                
            // } else {
            //     result = await keywordCollection.insertOne(
            //         {website_id:websiteId, keywords:keywords}
            //         )
            // }
        
            // if(result)
            //     res.status(200).json({"msg" : "keywords added"})
            // else
            //     res.send(404)

        } catch(error) {
            logger.error(error.message)
            res.status(500).send({"msg":error.message})
        }
    }

}

const addAnnouncement = async function(req, res) {
    const website_id = req.body.website_id;
    const announcementData = req.body.announcement;
    if(website_id == null || announcementData==null){
        logger.error("website_id or announcement not present")
        res.send(403)
    } else {
        try {
            const client = await dbConn();
            const database = client.db("ahd")
            const collection = database.collection("announcement")

            const data = await collection.findOne({website_id: website_id})
            let announcement = {id: Date.now(), announcement: announcementData}
            let result
            if(data){
                result = await collection.updateOne(
                    {website_id: website_id}, {$push: { announcement: announcement}}
                    )
                
            } else {
                result = await collection.insertOne(
                    {website_id:website_id, announcement:[announcement]}
                    )
            }
        
            if(result)
                res.status(200).json({"msg" : "announcement created"})
            else
                res.send(404)
        } catch(error) {
            logger.error(error.message)
            res.status(500).send({"msg":error.message})
        }
    }
}

async function checkIfUserAlreadyPresent(email) {
    const client = await dbConn();
    const database = client.db("ahd")
    const users = database.collection("users")

    const user = await users.findOne({email: email})

    if(user) return true
    else return false
}

const handleAddQna = async (req,res)=>{
    const question = req.body.question
    const answer = req.body.answer 
    const website_id = req.body.website_id
    if(!question || !answer || !website_id){
        logger.info("Missing Details")
        res.status(400).json({"message":"question or answer is missing"})
        return
    }
    
    try{
        await addQna(question,answer,website_id)
        res.status(200).json({"message":"Question Added Successfully"})
    }
    catch(err){
        logger.info(err)
        res.status(500).json({"message":"Sorry Internal Server Error"})
    }

}


const usercountdetails = async (req,res)=>{
    const wi = req.query.website_id
    try{
        const db = await dbConn()
        
        const r = await db.db('ahd').collection('usercount')
        .find({webiste_id:wi})
        .limit(1)
        .toArray()

        res.status(200).json({"msg":"Success",data:r[0].data})
    }
    catch(err){
        logger.info(err)
        res.status(500).json({"msg":"failed"})
    }
}
const averagecountdetails = async (req,res)=>{
    const wi = req.query.website_id
    try{
        const db = await dbConn()
        
        const r = await db.db('ahd').collection('oldusersetcount')
        .find({webiste_id:wi})
        .limit(1)
        .toArray()

        res.status(200).json({"msg":"Success",data:r[0].data})
    }
    catch(err){
        logger.info(err)
        res.status(500).json({"msg":"failed"})
    }
}
const averagetimedetails = async (req,res)=>{
    const wi = req.query.website_id
    try{
        const db = await dbConn()
        
        const r = await db.db('ahd').collection('usertime')
        .find({webiste_id:wi})
        .limit(1)
        .toArray()

        res.status(200).json({"msg":"Success",data:r[0].data})
    }
    catch(err){
        logger.info(err)
        res.status(500).json({"msg":"failed"})
    }
}

module.exports = {
    registerUser, 
    loginUser, 
    getKeywords,
    addKeywords,
    addAnnouncement,
    handleAddQna,
    usercountdetails,
    averagecountdetails,
    averagetimedetails
}

