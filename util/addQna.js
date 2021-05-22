
const fetch = require('node-fetch')
const crs = require('crypto-random-string')
const logger = require('./loggermodule')


const addQna = async (question,answer,website_id)=>{

    const actionName = crs({length: 10, type: 'url-safe'}) 

    const displayName = crs({length: 10, type: 'url-safe'}) 
    const messages = [{
        "text":{"text":question}
    }]
    const trainingPhrases = [
        { "parts":[{ "text" : answer }], "type":"EXAMPLE"}
    ]
    
    const requestBody = { 
            "action": actionName, 
            "resetContexts": false, 
            "defaultResponsePlatforms": [], 
            "outputContexts": [], 
            "messages": messages, 
            "parameters": [], 
            "displayName": displayName, 
            "mlDisabled": false, 
            "inputContextNames": [], 
            "events": [], 
            "trainingPhrases": trainingPhrases, 
            "webhookState": "WEBHOOK_STATE_UNSPECIFIED", 
            "priority": 500000, "endInteraction": true, 
            "conditionalFollowupEventInputs": [] 
        }
    
    
    return fetch("https://dialogflow.clients6.google.com/v2beta1/projects/first-agent-wxks/locations/global/agent/intents?languageCode=en&alt=json&key=AIzaSyD1dO8oRagJkmtkSJ9oLI289jIT8M4Zk5s", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,te-IN;q=0.8,te;q=0.7",
            "authorization": "Bearer ya29.a0AfH6SMBfYj6RqyDIJcGtPqEv3fl35IRTB4Gu3gRfiVJFWWgVwKFbttk6ZkjHnvWtij8qO4Y3WlYGJ-Qip9z-v2HFMIpP8C6uKnV5xifRpbbjwMt65q664XC3IoK6BO2O-jjaxbycTWTZDQMO8m6OSCm0urxMNtE8yXCElsFH7GiXpr32KjxIlehLLlxg6e_uhTnHpaagvDDBGK6NOSKl78qPJblDfdQ7tDa4llfGXmQuagQ",
            "content-type": "application/json",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
            "sec-ch-ua-mobile": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-client-data": "CIq2yQEIpLbJAQjBtskBCKmdygEI+MfKAQi86MoBCNGaywEIqZ3LAQiioMsBCPLwywEI3fLLAQin88sBGK6pygEY0sHKAQ==",
            "x-clientdetails": "appVersion=5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F90.0.4430.212%20Safari%2F537.36&platform=Win32&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F90.0.4430.212%20Safari%2F537.36",
            "x-goog-encode-response-if-executable": "base64",
            "x-javascript-user-agent": "google-api-javascript-client/1.1.0",
            "x-origin": "https://dialogflow.cloud.google.com",
            "x-referer": "https://dialogflow.cloud.google.com",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "SEARCH_SAMESITE=CgQIu5IB; OGPC=19022552-1:; OGP=-19022552:; HSID=AEA8icTQ41veW_Rkr; SSID=AFtSFDH3PRVTn3sbE; APISID=-1c-pKJBtgDpKlUC/AWP18tgc2eAlqDRbK; SAPISID=td03SkeJKXyDAALV/ALdZ-6NximxV1c0Tg; __Secure-3PAPISID=td03SkeJKXyDAALV/ALdZ-6NximxV1c0Tg; SID=9gepvxwpBuXaCKls0rm99W0KgrIlH6-ixdD8VpWms7Ufvm8kYxB5fDep0-BMfNbxHWSbbw.; __Secure-3PSID=9gepvxwpBuXaCKls0rm99W0KgrIlH6-ixdD8VpWms7Ufvm8k9I0TY0V75GampyKVc31I7w.; 1P_JAR=2021-05-21-18; NID=216=lBbTRropvsVbM6eTigmvyOtCozobx7PxZXCK9_yV4I2MSNUYICBQUr717I50SFu6YGX-Q3MBhJgp3Dr6aR45hMeqbw9w0lHn3u96OZhvDOmpvpAFWna4CzPdp-FGIhDj4motb5IUBk7-d83WLyZGSqivFp_ApHd12d8OaRr__k_tVYIJx0SrCvLfyQ4UeafZ3Zco2_1cfgERL3zBApjC0_EeD2bZvxcAG4OE3fVtPp-gm8rwIsizpqNRgJaG4-ouRT5BEeGOOC_kbyvHbxnsOikqVmcPM0Lt30cvS_GAa2OF0eqk0tepTV5cXpoeB-Qrj0ESwWEo1sacZ0Jt4IYlJqrRl2p6GcTEkxCRB_1EsgQ; SIDCC=AJi4QfFiBHrChQ1AsrikZB_lr0EdiXd0_qHjKhGcqxXwADk6Qgd8RsgMVpijNCiYI6fyiF2b5_DM; __Secure-3PSIDCC=AJi4QfHDPCBxQmCKC-U2osb7k643UNq8xD5vvYyZFYPrkOLtOLrKgszsxv6RJhVgXD89Idlp_YC_"
        },
        "referrer": "https://dialogflow.clients6.google.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.vQiXRrxCe40.O%2Fam%3DAQ%2Fd%3D1%2Frs%3DAGLTcCMBxIGVyXSdvvcs43a64yHt_P7dfg%2Fm%3D__features__",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body":JSON.stringify(requestBody), 
        "method": "POST",
        "mode": "cors"
    })
    .then(data => data.json())
    .then(data=>{
        logger.info(data)
    })
}

module.exports = addQna