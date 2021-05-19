let db = getDbConn()

const verifyPublicKey = async (key)=>{
    // let publicKey = req.headers('Authorization')
    if(!key) return false
    return true
}