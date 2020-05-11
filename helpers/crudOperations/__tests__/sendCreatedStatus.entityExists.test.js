const { mockResponse } = require("../../../utils/interceptor");

const {
  validateTruthiness,
  validateSendMockCalls,
  validateToHaveBeenCalledWithConflict,
  validateEntityExistsResponseMessage,
} = require("../../../utils/validators");

const sendCreatedStatus = require("../sendCreatedStatus.helper");

const res = mockResponse();

describe("sendCreatedStatus() unit test", () => {
  const existsMessage = {
    message: "This entity already exists",
  };
  const response = {};

  const results = sendCreatedStatus(res, existsMessage);
  results([response, false]);

  it("should validate 409 response", () => {
    validateTruthiness(results);
    validateToHaveBeenCalledWithConflict(res.status);
    const { message } = res.send.mock.calls[0][0];
    validateEntityExistsResponseMessage(message);
    validateSendMockCalls(res.send, 1);
  });
});
