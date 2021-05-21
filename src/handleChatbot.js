// const {SessionsClient} = require('dialogflow')
// const serviceAccount = require('../first-agent-wxks-firebase-adminsdk-1arkh-bb41aa6da0.json')
const logger  = require('../util/loggermodule')
const getDialogFlowResponse = require('../util/getDialogFlowResponse')

const handleChatbot = async (data)=>{
    const text = data.searchText
    if(!text) throw err

    const sessionId = "randomId"

    try{
        const response = await getDialogFlowResponse(text,sessionId)
        logger.info("handleChatbot.js, reponseRecieved: ",response)
        if(response && response.queryResult)
            return response.queryResult.fulfillmentText
        return ""
    }
    catch(err){
        logger.info(err)
        return
    }
}

module.exports = handleChatbot