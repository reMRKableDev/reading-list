const handleError = require("../handleError.helper");

const { mockResponse } = require("../../../utils/interceptor");

const {
  validateSendMockCalls,
  validateToHaveBeenCalledWithInternalServerError,
} = require("../../../utils/validators");

const res = mockResponse();

describe("handleError helper unit tests", () => {
  it("should validate that helper function throws errors", () => {
    const test = () => {
      handleError(res, new Error());
    };

    expect(test).toThrowError(/Error when finding/);
    validateToHaveBeenCalledWithInternalServerError(res.status);
    validateSendMockCalls(res.send, 1);
  });
});
