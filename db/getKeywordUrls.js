const { getDbConn } = require("../db/getDbConn")
const logger = require("../util/loggermodule")

const getKeywordUrls = async (website_id)=>{
    try{
        const db  = await getDbConn()
        return db.db('ahd').collection('keyword_table')
                .find({website_id})
                .toArray()
    }
    catch(err){
        logger.info(err)
        throw err
    }    
}

module.exports = getKeywordUrls