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

}

const userRegister = async function(req, res) {
    
}

module.exports = {
    // handleSearch,
    feedback,
    addBugReport,
}
