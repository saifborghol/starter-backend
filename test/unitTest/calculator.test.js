const mathOperations = require('../../src/helpers/calculator');


describe("Calculator Tests", () => {
    test("Sum", () => {
    // arrange and act
    var result = mathOperations.sum(1,2)
    
    // assert
    expect(result).toBe(3);
    });
})