const handleCrawl = (req,res)=>{
    const id_token = req.token
    const url = req.websiteUrl
    if(!validateUrl(url)) res.status(400).send({"status":400})
    let tempList = ["/about","/home","/contact","/privacy","/random"]
    res.send({status:200,urls:tempList})
}


module.exports = handleCrawl