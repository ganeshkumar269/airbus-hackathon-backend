const getKeywords = require("../db/getKeywords");
const getKeywordUrls = require("../db/getKeywordUrls");
const logger = require("../util/loggermodule")
const onMessage = require('./onMessage')

const customWait=ms=>new Promise(resolve => setTimeout(resolve, ms));

const onConnection = async (ws,conn,req)=>{
    let keywords = []
    let keywordToUrls = {}
    logger.info("there is a websocket connection attempt")
    conn.on('open',()=>logger.info("Ws Conn opened"))
    conn.on('message',(data)=>{
        logger.info("Message Recieved: ",data)
        onMessage(conn,data,keywords,keywordToUrls)
    })
    conn.on('close',()=>logger.info("Ws Conn closed"))
    conn.on('error',(err)=>logger.info("Ws Conn error",err))

    Promise.all([
        getKeywords(),
        getKeywordUrls()
    ])
    .then((values)=>{
        if(values.length == 2){
            keywords = values[0]
            keywordToUrls = values[1]
        }
    })

}

module.exports = onConnection