const logger = require("../util/loggermodule")
const patternMatch = require('../util/patternMatch')

/*

    {
        navsearch: boolean,
        searchTex: string,
    }

    {
        chatbot: boolean,
        text: string
    }

*/
const onMessage = async (conn,data,keywords,keywordToUrls)=>{
    if(!data) return
    let data_json;
    try{
        data_json = await JSON.parse(data)
    }
    catch(err){
        logger.info(err)
        return
    }

    if(data_json.navsearch == true)
    {
        const searchText = data_json.searchText
        if(!searchText){
            logger.info("SearchText Found")
            conn.send(JSON.stringify({status:400,"msg":"No searchText Found"}))
            return
        }
        let matchedKeywords = await patternMatch(searchText,keywords)
        logger.info("matchedKeywords ",matchedKeywords)
        let response_list = []
        
        matchedKeywords.forEach(keyword=>{
            response_list = response_list + keywordToUrls[keyword]
        })
        logger.info(response_list)
        conn.send(JSON.stringify(response_list))
    }
    if(data_json.chatbot == true)
        handleChatbot(data_json)
}

module.exports = onMessage