const { closeDbConn } = require("../db/getDbConn")
const getKeywordUrls = require("../db/getKeywordUrls")


describe("Test getKeywordUrl",()=>{
    test("test 1",()=>{
        return getKeywordUrls("testkeyword")
        .then(data=>{
            expect(data.urls).toEqual(["/path1","/path2","/path3"])
        })
    })
    afterAll(()=>closeDbConn())
})