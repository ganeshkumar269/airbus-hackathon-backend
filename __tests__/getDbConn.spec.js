const {getDbConn,closeDbConn} = require('../db/getDbConn')
describe("getDbConn test",()=>{
    test("Test 1",()=>{
        return getDbConn()
        .then(data=>{
            expect(data).toBeTruthy()
        })
    })
    afterAll(()=>closeDbConn())
})