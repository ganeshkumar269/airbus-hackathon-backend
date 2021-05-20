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

module.exports = {
    // handleSearch,
    feedback,
}