const verifyIdToken = require('../util/verifyIdToken')

const verifyIdTokenMiddleware = (req,res) =>{
    let id_token = req.header('Authorization')
    if(!id_token) res.json({status:400, message:"Auth Token Not Found"}).status(400)
    if(verifyIdToken(id_token)){
        res.token = id_token;
        next()
    }
    res.json({status:401, message:"Invalid Auth Token"}).status(401)
}


module.exports = verifyIdTokenMiddleware 