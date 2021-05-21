const logger = require('../util/loggermodule')
const validateUrl = require('../util/validateUrl')
const crawlWebsite = require('../util/crawlWebsite')


const handleCrawl = async (req,res)=>{

    const id_token = req.token
    const url = req.query.url
    let sameDomain = req.query.sameDomain
    if(!url || !sameDomain){
        res.status(400).json({status:400,message:"url or sameDomain not found"})
        return
    }

    logger.debug("Url ",url)
    logger.debug("sameDomain ",sameDomain)

    if(!validateUrl(url)) {
        res.status(400).send({"status":400,message:"invalid URL"})
        return
    }
    try{
        let urlSet = new Set()
        await crawlWebsite(url,url,sameDomain == "true" ? true:false,urlSet)
        logger.info("Url length ", urlSet.size)
        res.send({status:200,urls:Array.from(urlSet)})
    }
    catch(err){
        logger.info("handleCrawl.js ",err)
        res.status(500).json({message:"Internal Server Error"})
    }        

    // let tempList = ["/about","/home","/contact","/privacy","/random"]

}

module.exports = handleCrawl