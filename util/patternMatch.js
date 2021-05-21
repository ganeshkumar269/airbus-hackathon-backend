const patternMatch = async (searchText,keywords)=>{
    if(!searchText || !keywords) return []

    let matchedKeywords = []

    let searchTextPattern = new RegExp(searchText,"i")
    keywords.forEach(keyword=>{
        const substringWithThePattern = keyword.match(searchTextPattern)
        if(substringWithThePattern)
            matchedKeywords.push(keyword)
        const keywordPattern = new RegExp(keyword,"i")
        const substring = searchText.match(keywordPattern)
        if(substring)
            matchedKeywords.push(substring)        
    })

    return matchedKeywords
}


module.exports = patternMatch