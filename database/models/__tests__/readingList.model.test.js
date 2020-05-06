const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock();

const ReadingList = require("../readingList.model");

let readingListMock;

const {
  validateTruthiness,
  validateObjectDataType,
  validateObjectToHaveProperty,
  validateMatchingStringValues,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("Reading List Model unit tests", () => {
  beforeEach(() => {
    readingListMock = ReadingList(SequelizeMock, connectionMock);
  });

  it("should validate model name to equal 'book' ", () => {
    validateMatchingStringValues(readingListMock.name, "readingList");
  });

  it("should validate table name to equal 'books' ", () => {
    validateMatchingStringValues(readingListMock.tableName, "readingLists");
  });

  it("should validate table columns", () => {
    validateTruthiness(readingListMock._defaults);
    validateObjectDataType(readingListMock._defaults);
  });

  it("should validate 'name' column properties", () => {
    validateObjectToHaveProperty(readingListMock._defaults, "name");
    validateObjectToHaveProperty(readingListMock._defaults.name, "type");
    validateObjectToHaveProperty(readingListMock._defaults.name, "allowNull");
    validateMatchingStringValues(
      readingListMock._defaults.name.type.key,
      /string/i
    );
    validateBooleanValues(readingListMock._defaults.name.allowNull, false);
  });

  it("should validate 'type' column properties", () => {
    validateObjectToHaveProperty(readingListMock._defaults, "type");
    validateObjectToHaveProperty(readingListMock._defaults.type, "type");
    validateObjectToHaveProperty(readingListMock._defaults.type, "allowNull");
    validateMatchingStringValues(
      readingListMock._defaults.type.type.key,
      /string/i
    );
    validateBooleanValues(readingListMock._defaults.type.allowNull, false);
  });
});
