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

const updateBookReadingListId = require("../updateBookReadingListId.helper");

const res = mockResponse();
const req = mockRequest();

describe("findOne() unit test", () => {
  it("should validate object type returned for book ", () => {
    const okMessage = { message: "The book has been updated" };
    const notFoundMessage = { message: "Couldn't find that book" };

    const results = updateBookReadingListId(
      req,
      res,
      req.body.readingListId,
      {},
      readingListMock,
      bookMock,
      okMessage,
      notFoundMessage
    );
    validateObjectDataType(results);
  });
});
