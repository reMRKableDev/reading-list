const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock();

const bookMock = require("../../../database/models/book.model")(
  SequelizeMock,
  connectionMock
);

const readingListMock = require("../../../database/models/readingList.model")(
  SequelizeMock,
  connectionMock
);

const { mockResponse, mockRequest } = require("../../../utils/interceptor");

const { validateObjectDataType } = require("../../../utils/validators");

const findOne = require("../findOne.helper");

const res = mockResponse();
const req = mockRequest();

describe("findOne() unit test", () => {
  it("should validate object type returned for book ", () => {
    const message = { message: "Couldn't find that book!" };

    const results = findOne(req, res, bookMock, message);
    validateObjectDataType(results);
  });

  it("should validate object type returned for readingList ", () => {
    const message = { message: "Couldn't find that reading list!" };

    const results = findOne(req, res, readingListMock, message);
    validateObjectDataType(results);
  });
});
