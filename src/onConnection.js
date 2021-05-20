const getKeywords = require("../db/getKeywords");
const getKeywordUrls = require("../db/getKeywordUrls");
const logger = require("../util/loggermodule")
const onMessage = require('./onMessage')

const customWait=ms=>new Promise(resolve => setTimeout(resolve, ms));

const onConnection = async (ws,conn,req)=>{
    let keywords = []
    let keywordToUrls = {}
    const url = new URL(req.url)
    const website_id = url.searchParams.get('website_id') || "12233"


    logger.info("Websocket connection attempt with website_id: ",website_id)
    
    conn.on('open',()=>logger.info("Ws Conn opened"))
    conn.on('message',(data)=>{
        logger.info("Message Recieved: ",data)
        onMessage(conn,data,keywords,keywordToUrls)
    })
    conn.on('close',()=>logger.info("Ws Conn closed"))
    conn.on('error',(err)=>logger.info("Ws Conn error",err))

    Promise.all([
        getKeywords("12233"),
        getKeywordUrls("12233")
    ])
    .then((values)=>{
        if(values.length == 2){
            logger.info(values)
            keywords = values[0].keywords
            keywordToUrls = values[1]
        }
    })

}

module.exports = onConnection