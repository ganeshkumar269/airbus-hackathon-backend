const bcrypt = require('bcrypt')

const logger = require('../util/loggermodule')
const dbConn = require('../db/getDbConn').getDbConn;

const loginUser = async function (req, res) {
    const email = req.body.email
    const client = await dbConn();
    const database = client.db("ahd")
    const users = database.collection("users")

    const user = await users.findOne({email: email})
    if(user!=null){
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)

        if(passwordMatch){
            res.status(200).json({"msg":"User logged in"});
        }else {
            res.status(404).json({"msg": "User name or password is wrong"})
        }
    }else{
        res.status(404).json({"msg": "User name or password is wrong"})
    }

}

const registerUser = async function(req, res) {
    isPresent = await checkIfUserAlreadyPresent(req.body.email)
    if(isPresent){
        res.status(404).json({"msg": "User already present"})
    }else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 9)
            const user = {
                email: req.body.email,
                password: hashedPassword
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
            console.log(error)
        }
    }
}

const getFeedbacks = function(req, res) {

}

const getKeywords = async function(req, res) {
    const client = await dbConn();
    const database = client.db("ahd")
    const keywords = database.collection("website_keywords")

    const websiteId = req.body.website_id;

    const keywordsData = await keywords.findOne({website_id: websiteId})
    const keyword_arr = keywordsData.keywords

    res.status(200).send(keyword_arr)
}

const addKeywords = async function(req, res) {
    const client = await dbConn();
    const database = client.db("ahd")
    const keywordCollection = database.collection("website_keywords")

    const websiteId = req.body.website_id;
    const keywords = req.body.keywords;

    const result = await keywordCollection.updateOne(
                        {website_id: websiteId}, {$addToSet: { keywords: {$each:keywords}}}
                        )

    if(result)
        res.status(200).json({"msg" : "keywords added"})
    else
        res.status(404)
}

async function checkIfUserAlreadyPresent(email) {
    const client = await dbConn();
    const database = client.db("ahd")
    const users = database.collection("users")

    const user = await users.findOne({email: email})

    if(user) return true
    else return false
}

module.exports = {
    registerUser, 
    loginUser, 
    getKeywords,
    addKeywords
}