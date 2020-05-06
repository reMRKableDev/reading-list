const handleError = require("../handleError.helper");

const { mockResponse } = require("../../../utils/interceptor");

const res = mockResponse();

describe("handleError helper unit tests", () => {
  it("should validate that helper function throws errors", () => {
    const test = () => {
      handleError(res, new Error());
    };

    expect(test).toThrowError(/Error when finding/);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send.mock.calls).toHaveLength(1);
  });
});
