const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock();

const bookMock = require("../../../database/models/book.model")(
  SequelizeMock,
  connectionMock
);

const { mockResponse, mockRequest } = require("../../../utils/interceptor");

const { validateObjectDataType } = require("../../../utils/validators");

const findAllBooksInReadingList = require("../findAllBooksInReadingList.helper");

const res = mockResponse();
const req = mockRequest();

describe("findAllBooksInReadingList() unit test", () => {
  it("should validate object type returned for book ", () => {
    const results = findAllBooksInReadingList(req, res, bookMock);
    validateObjectDataType(results);
  });
});
