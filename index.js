let express = require('express')
let cors = require('cors')

const verifyIdTokenMiddleware = require('./middlewares/verifyTokenMiddleware')
const handleCrawl = require('./src/handleCrawl')

let app = express()
app.use(cors.apply({
    origin:"*"
}))

app.get("/",(req,res)=>res.send("Hello,World!"))

app.get('/api/v1/crawl',verifyIdTokenMiddleware, handleCrawl)
app.get("/api/v1/navsearch",handleNavSearch)


app.listen(process.env.PORT || 3000,() => console.log("Server at 3000"))