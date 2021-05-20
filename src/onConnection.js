const getKeywords = require("../db/getKeyWords")
const logger = require("../util/loggermodule")
const onMessage = require('./onMessage')

const customWait=ms=>new Promise(resolve => setTimeout(resolve, ms));

const onConnection = async (ws,conn,req)=>{
    let keywords = []
    let keywordToUrls = {}
    logger.info("there is a websocket connection attempt")
    conn.on('open',()=>logger.info("Ws Conn opened"))
    conn.on('message',(data)=>onMessage(conn,data,keywords,keywordToUrls))
    conn.on('close',()=>logger.info("Ws Conn closed"))

    Promise.all([
        customWait(2*1000).then(data=>{
            logger.info("customwait1 over for 2 sec")
            return getKeywords()
        }),
        customWait(2*1000)
        .then(data=>{
            logger.info("customwait2 over for 2 sec")
            return {
                "about" : ["/about","/about-you"],
                "contact":["/contact-us","/contact-sss"],
                "home":["/home"],
                "private":["/privatehome","/privateroom"]
            }
        })
    ])
    .then((values)=>{
        if(values.length == 2){
            keywords = values[0]
            keywordToUrls = values[1]
        }
    })

}

module.exports = onConnection