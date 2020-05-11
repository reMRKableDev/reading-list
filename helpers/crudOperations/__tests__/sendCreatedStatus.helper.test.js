const { mockResponse } = require("../../../utils/interceptor");

const {
  validateTruthiness,
  validateSendMockCalls,
  validateCreatedDataValues,
  validateToHaveBeenCalledWithOk,
} = require("../../../utils/validators");

const sendCreatedStatus = require("../sendCreatedStatus.helper");

const res = mockResponse();

describe("sendCreatedStatus() unit test", () => {
  const existsMessage = {
    message: "This entity already exists",
  };
  const response = { dataValues: { id: 1 } };

  const results = sendCreatedStatus(res, existsMessage);
  results([response, true]);

  it("should validate 200 response", () => {
    validateTruthiness(results);
    validateToHaveBeenCalledWithOk(res.status);
    validateSendMockCalls(res.send, 1);

    const dataValues = res.send.mock.calls[0][0];
    validateCreatedDataValues(dataValues, response.dataValues);
  });
});
