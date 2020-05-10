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

const { mockResponse } = require("../../../utils/interceptor");

const { validateObjectDataType } = require("../../../utils/validators");

const findAll = require("../findAll.helper");

const res = mockResponse();

describe("findAll() unit test", () => {
  it("should validate object type returned for book ", () => {
    const message = { message: "There are no books saved at this moment!" };

    const results = findAll(res, bookMock, message);
    validateObjectDataType(results);
  });

  it("should validate object type returned for readinglist ", () => {
    const message = { message: "There are no books saved at this moment!" };

    const results = findAll(res, readingListMock, message);
    validateObjectDataType(results);
  });
});
