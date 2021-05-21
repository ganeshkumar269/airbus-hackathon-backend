var fetch = require('node-fetch');
var cheerio = require('cheerio');
const validateUrl = require('./validateUrl');

const crawlWebsite = async (root,currentUrl,sameDomain,urlSet,depth)=>{

    //https://stackoverflow.com/questions/15343292/extract-all-hyperlinks-from-external-website-using-node-js-and-request

    if(depth > 3) return
    if(urlSet.size > 50) return
    if(!validateUrl(currentUrl)) return
    if(urlSet.has(currentUrl)) return

    return fetch(currentUrl)
    .then(data=>data.text())
    .then((data)=>{
        $ = cheerio.load(data)
        links = $('a');
        let req_urls = []

        $(links).each((i, link)=>{
            let url = $(link).attr('href')
            if(!url) return
            if(url == "#") return
            if(urlSet.has(url)) return
            let flag = false
            if(sameDomain){
                if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0){
                    if(url.startsWith(root))    
                        flag = true
                }
                else{
                    //there are all relative urls
                    url = root + url
                    flag = true
                }
            }
            else
                flag = true
            if(flag){
                urlSet.add(url)
                return crawlWebsite(root,url,sameDomain,urlSet,depth+1)
            }
        })

        return req_urls
    })
}


module.exports = crawlWebsite
