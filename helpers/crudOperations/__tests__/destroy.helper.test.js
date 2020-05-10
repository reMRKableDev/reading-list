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

const destroy = require("../destroy.helper");

const res = mockResponse();
const req = mockRequest();

describe("findAll() unit test", () => {
  it("should validate object type returned for book ", () => {
    const okMessage = { message: "The book has been deleted" };
    const notFoundMessage = { message: "Couldn't find that book" };

    const results = destroy(req, res, bookMock, okMessage, notFoundMessage);
    validateObjectDataType(results);
  });

  it("should validate object type returned for readinglist ", () => {
    const okMessage = {
      message: "The reading list has been deleted",
    };
    const notFoundMessage = { message: "Couldn't find that reading list" };

    const results = destroy(
      req,
      res,
      readingListMock,
      okMessage,
      notFoundMessage
    );
    validateObjectDataType(results);
  });
});
