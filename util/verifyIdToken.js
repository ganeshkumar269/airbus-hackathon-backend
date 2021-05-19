const verifyIdToken = (id_token)=>{
    if(id_token) return true;
    return false;
}

module.exports = verifyIdToken