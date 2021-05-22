const getKeywords = require("../db/getKeywords");
const getKeywordUrls = require("../db/getKeywordUrls");
const logger = require("../util/loggermodule")
const onMessage = require('./onMessage')
const verifyWebsiteId = require('../util/verifyWebsiteId')

const customWait=ms=>new Promise(resolve => setTimeout(resolve, ms));

const onConnection = async (ws,conn,req)=>{
    let keywords = []
    let keywordToUrls = {}


    if(!("url" in req)){
        logger.info("Url Not found in req object")
        conn.close(4001,"No Url Req object")
        return
    }
    
    const searchParams = new URLSearchParams(req.url.substr(1))
    logger.debug(searchParams)
    if(!searchParams.has("website_id")){
        logger.info("onConnection.js, website_id not found")
        conn.close(4002,"No Webiste_id found")
        return
    }

    const website_id = searchParams.get('website_id')
    if(!verifyWebsiteId(website_id)){
        logger.info("onConnection.js", "website_id invalid")
        conn.close(4003,"Invalid website_id")
        return
    }

    logger.info("Websocket connection attempt with website_id: ",website_id)
    
    conn.on('open',()=>logger.info("Ws Conn opened"))
    conn.on('message',(data)=>{
        logger.info("Message Recieved: ",data)
        onMessage(conn,data,keywords,keywordToUrls)
    })
    conn.on('close',()=>logger.info("Ws Conn closed"))
    conn.on('error',(err)=>logger.info("Ws Conn error",err))

    getKeywordUrls(website_id)
    .then(data=>{
        logger.info("onConnection.js data, ", data)
        keywordToUrls = data
        for(let key in Object.keys(keywordToUrls))
            keywords.push(key)
        logger.info("onConnection.js keywords", keywords)
    })
    // Promise.all([
    //     getKeywords(website_id),
    //     getKeywordUrls(website_id)
    // ])
    // .then((values)=>{
    //     if(values.length == 2){
    //         logger.info(values)
    //         keywords = values[0].keywords
    //         keywordToUrls = values[1]
    //     }
    // })

}

module.exports = onConnection