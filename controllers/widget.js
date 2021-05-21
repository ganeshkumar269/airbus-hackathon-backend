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

const feedback = function(req, res) {

    let feedbackData = req.body
    if(!feedbackData) res.status(400).json({"error": "no data"})
    feedbackData = {...feedbackData, id:1}
    dbConn()
        .then(db=> {
            return db.db("ahd").collection("feedback").insertOne(feedbackData)
        })
        .then(()=> res.status(200).json({"msg" : "feedback successfully submitted"}))
        .catch((error) => {
            logger.error(error.message)
            res.status(500).json({"error": error.message})
        })
}

const addBugReport = async function(req, res) {
    const websiteId = req.body.website_id;
    let bugReport = req.body.bugReport;
    if(websiteId == null || bugReport == null){
        logger.error("website_id or bug report not present")
        res.send(403)
    } else {
        try {
            const client = await dbConn();
            const database = client.db("ahd")
            const collection = database.collection("bugReports")

            const data = await collection.findOne({website_id: websiteId})
            bugReport = {id: Date.now(), ...bugReport}
            let result
            if(data){
                result = await collection.updateOne(
                    {website_id: websiteId}, {$addToSet: { bugReport: bugReport}}
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

}

const userRegister = async function(req, res) {
    
}

module.exports = {
    // handleSearch,
    feedback,
    addBugReport,
}

