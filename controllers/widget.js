const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../util/loggermodule')
const dbConn = require('../db/getDbConn').getDbConn;


// handleSearch = async function(req, res) {
//     try {
//         console.log(db)
//         console.log(db.collection('website_keywords').find())

//         res.status(200).send("Hello")
//     } catch (error) {
//         console.log(error.message)
//     }
// }

const feedback = async function(req, res) {
    const websiteId = req.body.website_id;
    const email = req.body.email;
    const feedbackTitle = req.body.feedbackTitle;
    const feedbackDesc = req.body.feedbackDesc;
    if(websiteId == null || feedbackTitle == null || feedbackDesc==null || email==null){
        logger.error("website_id or feedback or  not present")
        res.send(403)
    }else {
            try {
                const client = await dbConn();
                const database = client.db("ahd")
                const collection = database.collection("feedback")
    
                const data = await collection.findOne({website_id: websiteId})
                let feedback = {id: Date.now(), email, feedbackTitle, feedbackDesc}
                let result
                if(data){
                    result = await collection.updateOne(
                        {website_id: websiteId}, {$push: { feedbacks: feedback}}
                        )
                    
                } else {
                    result = await collection.insertOne(
                        {website_id:websiteId, feedbacks:[feedback]}
                        )
                }
            
                if(result)
                    res.status(200).json({"msg" : "feedback added"})
                else
                    res.send(404)
            } catch(error) {
                logger.error(error.message)
                res.status(500).send({"msg":error.message})
            }
        }
}

const addBugReport = async function(req, res) {
    const websiteId = req.body.website_id;
    const email = req.body.email;
    const bugReportTitle = req.body.bugReportTitle;
    const bugReportDesc = req.body.bugReportDesc;
    if(websiteId == null || bugReportTitle == null || bugReportDesc==null || email==null){
        logger.error("website_id or feedback or  not present")
        res.send(403)
    } else {
        try {
            const client = await dbConn();
            const database = client.db("ahd")
            const collection = database.collection("bugReports")

            const data = await collection.findOne({website_id: websiteId})
            let bugReport = {id: Date.now(), email, bugReportTitle, bugReportDesc}
            let result
            if(data){
                result = await collection.updateOne(
                    {website_id: websiteId}, {$push: { bugReport: bugReport}}
                    )
                
            } else {
                result = await collection.insertOne(
                    {website_id:websiteId, bugReport:[bugReport]}
                    )
            }
        
            if(result)
                res.status(200).json({"msg" : "bug report added"})
            else
                res.send(404)
        } catch(error) {
            logger.error(error.message)
            res.status(500).send({"msg":error.message})
        }
    }
}

const userLogin = async function(req, res) {
    const email = req.body.email
    const password = req.body.password
    const website_id = req.body.website_id
    if(email==null || password==null || website_id==null){
        logger.error("Data missing")
        res.status(404).send({"msg": "Data is Missing"})
    }else {        
        const client = await dbConn();
        const database = client.db("ahd")
        const collection = database.collection("users")
        
        //need a way to check website id and then user email
        const userData = await collection.findOne({website_id:website_id})
        if(userData!=null){
            const users = userData.users;
            //check the user array
            const user = users.find((u) => u.email === email)
            // user is present check for password
            if(user){
                const passwordMatch = await bcrypt.compare(password, user.password)

                if(passwordMatch){
                    logger.info("User logged In")
                    let token = jwt.sign({user:user}, "secret")
                    res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                    res.status(200).json({"token":token});
                    
                }else {
                    res.status(404).json({"msg": "User name or password is wrong"})
                }
            } else {
                // user is not present
                const hashedPassword = await bcrypt.hash(req.body.password, 9)
                const newUser = {
                    email: req.body.email,
                    password: hashedPassword,
                }
                const result = await collection.updateOne(
                    {website_id:website_id}, {$push: {users:newUser}})

                if(result){
                    logger.info("User logged In")
                    let token = jwt.sign({user:newUser}, "secret")
                    res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                    res.status(200).json({"token":token});
                }else {
                    res.status(500).json({"error": err.message})
                }

            }
        }else{
            //website is not present
            // create user and send jwt
            const hashedPassword = await bcrypt.hash(req.body.password, 9)
            const user = {
                email: req.body.email,
                password: hashedPassword,
            }

            const client = await dbConn();
            const database = client.db("ahd")
            const users = database.collection("users")

            const result = await users.insertOne({website_id:website_id, users:[user]})

            if(result){
                logger.info("User logged In")
                let token = jwt.sign({user:user}, "secret")
                res.cookie('token',token, { maxAge: 900000, httpOnly: true });
                res.status(200).json({"token":token});
            }else {
                res.status(500).json({"error": err.message})
            }
        }
    }

}

const userRegister = async function(req, res) {
    
}

module.exports = {
    // handleSearch,
    feedback,
    addBugReport,
    userLogin
}

