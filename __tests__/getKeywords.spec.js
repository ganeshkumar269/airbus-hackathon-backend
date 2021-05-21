const { closeDbConn } = require('../db/getDbConn')
const getKeywords = require('../db/getKeywords')
const logger = require('../util/loggermodule')

describe("getKeywords test",()=>{
    test("Test 1",()=>{
        return getKeywords("12233")
        .then(data=>{
            logger.info(data)
            expect(data.keywords).toEqual(["contact","about"])
        })
    })


    afterAll(()=>closeDbConn())

})