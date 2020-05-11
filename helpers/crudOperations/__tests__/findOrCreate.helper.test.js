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

const findOrCreate = require("../findOrCreate.helper");

const res = mockResponse();
const req = mockRequest();

describe("findOne() unit test", () => {
  it("should validate object type returned for book ", () => {
    const message = {
      message: "A book with this title already exists",
    };
    req.body.title = "Test Book";

    const results = findOrCreate(res, req.body.name, bookMock, message);
    validateObjectDataType(results);
  });

  it("should validate object type returned for readingList ", () => {
    const message = {
      message: "A reading list with this name already exists",
    };
    req.body.name = "Test Reading List";

    const results = findOrCreate(res, req.body.name, readingListMock, message);
    validateObjectDataType(results);
  });
});
