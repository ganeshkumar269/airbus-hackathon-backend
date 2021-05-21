const logger = require("../util/loggermodule")
const fetch = require('node-fetch')

const getDialogFlowResponse = async (text,sessionId)=>{
    
    const url = "https://dialogflow.cloud.google.com/v1/integrations/messenger/webhook/d72fc1b3-bafd-4bab-b8ae-15072944bc0d/sessions/webdemo-"+sessionId+"?platform=webdemo"

    return fetch(url,{
        method:"POST",
        body:JSON.stringify({"queryInput":{"text":{"text":text,"languageCode":"en"}}})
    })
    .then(data=>{
        // logger.info("getDialogFlowResponse fetch-response: ",data)
        return data.text()
    })
    .then(data=>{
        logger.info(data)
        return JSON.parse(data.substr(5))
    })
    .catch(logger.info)
}

module.exports = getDialogFlowResponse