var MongoClient = require('mongodb').MongoClient
var config = require("../util/config")
const logger = require('../util/loggermodule')

const uri = config.DB_URI
var options = { useNewUrlParser:true,useUnifiedTopology:true}
var client = new MongoClient(uri, options)

var dbConn;
logger.info(uri)
const connectToDb = async ()=>{
    return client.connect()
        .then(db => {
            logger.info("Connected to DB")
            dbConn = db
        })
        .catch(err => console.error(err.stack))
}

const getDbConn = async () => {
    if(!dbConn) await connectToDb();
    return dbConn
}

const closeDbConn = ()=>{
    dbConn.close()
    logger.info("Close DB")
}
module.exports = {getDbConn,closeDbConn}