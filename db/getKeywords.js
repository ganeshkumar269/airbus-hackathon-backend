const logger = require('../util/loggermodule')
const {getDbConn} = require('./getDbConn')

const getKeywords = async (website_id)=>{
    try{
        const db = await getDbConn()
        return db.db('ahd').collection('website_keywords')
        .find({"website_id":website_id})
        .limit(1)
        .toArray()
        .then(data=>data ? data[0] : data)
    }
    catch(err){
        logger.info("getKeywords.js ",err)
        throw err
    }
}

module.exports = getKeywords 