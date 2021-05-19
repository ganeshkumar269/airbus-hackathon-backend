const validateUrl = require('../util/validateUrl')

const handleCrawl = (req,res)=>{

    const id_token = req.token
    const url = req.query.website

    if(!validateUrl(url)) {
        res.status(400).send({"status":400,message:"invalid URL"})
        return
    }

    let tempList = ["/about","/home","/contact","/privacy","/random"]
    res.send({status:200,urls:tempList})

}

module.exports = handleCrawl