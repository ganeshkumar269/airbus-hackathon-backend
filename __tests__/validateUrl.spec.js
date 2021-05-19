const validateUrl = require('../util/validateUrl')

describe("Validate Url Test",()=>{
    test("Test 1",()=>{
        expect(validateUrl("https://www.google.com")).toBe(true)
    })
    test("Test 2",()=>{
        expect(validateUrl("invalid")).toBe(false)
    })
})