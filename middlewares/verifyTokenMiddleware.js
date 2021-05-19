const verifyIdToken = require('../util/verifyIdToken')

const verifyIdTokenMiddleware = (req,res,next) =>{
    let id_token = req.header('Authorization')
    if(!id_token) res.status(400).json({status:400, message:"Auth Token Not Found"})
    if(verifyIdToken(id_token)){
        res.token = id_token;
        next()
    }
    res.status(401).json({status:401, message:"Invalid Auth Token"})
}


module.exports = verifyIdTokenMiddleware 