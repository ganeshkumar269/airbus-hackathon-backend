const handleNavSearch = (req,res)=>{
    const searchText = req.query?.searchText;

    if(!searchText){
        res.status(400).json({status:400,message:"searchtext not found"})
        return
    }
    
    try{
        const urls =  await patternMatch(searchText)
        res.status(200).json({status:200,urls:urls})
    }
    catch(err){
        res.status(500).json({status:500,"message":"Internal Error"})
    }

}