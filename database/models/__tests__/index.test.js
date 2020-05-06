const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock();

const db = require("../index");

const bookMock = require("../book.model")(SequelizeMock, connectionMock);

const readingListMock = require("../readingList.model")(
  SequelizeMock,
  connectionMock
);

const {
  validateTruthiness,
  validateObjectDataType,
} = require("../../../utils/validators");

describe("Database object unit test", () => {
  beforeEach(() => {
    db.Sequelize = SequelizeMock;
    db.connector = connectionMock;
    db.readingList = readingListMock;
    db.book = bookMock;
  });

  it("should validate the database object created", () => {
    validateTruthiness(db);
    validateObjectDataType(db);
  });
});
