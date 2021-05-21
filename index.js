let express = require('express')
let cors = require('cors')
const ws = require('ws')
const http = require('http')
const verifyIdTokenMiddleware = require('./middlewares/verifyTokenMiddleware')
const handleCrawl = require('./src/handleCrawl')
const handleNavSearch = require('./src/handleNavSearch')
const onConnection = require('./src/onConnection')

const adminRouter = require('./routes/admin')
const widgetRouter = require('./routes/widget')

let app = express()
app.use(cors.apply({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>res.send("Hello,World!"))

app.get('/api/v1/crawl', handleCrawl)
app.get("/api/v1/navsearch",handleNavSearch)
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/',widgetRouter)

const httpserver = http.createServer({},app)
const wsserver = new ws.Server({ server:httpserver });

httpserver.listen(process.env.PORT || 3000,() => console.log("Server at 3000"))

wsserver.on('connection',(conn,req)=>onConnection(wsserver,conn,req))