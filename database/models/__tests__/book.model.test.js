const SequelizeMock = require("sequelize-mock");

const connectionMock = new SequelizeMock();

const Book = require("../book.model");

let bookMock;

const {
  validateTruthiness,
  validateObjectDataType,
  validateObjectToHaveProperty,
  validateMatchingStringValues,
  validateBooleanValues,
} = require("../../../utils/validators");

describe("Book Model unit tests", () => {
  beforeEach(() => {
    bookMock = Book(SequelizeMock, connectionMock);
  });

  it("should validate model name to equal 'book' ", () => {
    validateMatchingStringValues(bookMock.name, "book");
  });

  it("should validate table name to equal 'books' ", () => {
    validateMatchingStringValues(bookMock.tableName, "books");
  });

  it("should validate table columns", () => {
    validateTruthiness(bookMock._defaults);
    validateObjectDataType(bookMock._defaults);
  });

  it("should validate 'title' column properties", () => {
    validateObjectToHaveProperty(bookMock._defaults, "title");
    validateObjectToHaveProperty(bookMock._defaults.title, "type");
    validateObjectToHaveProperty(bookMock._defaults.title, "allowNull");
    validateMatchingStringValues(bookMock._defaults.title.type.key, /string/i);
    validateBooleanValues(bookMock._defaults.title.allowNull, false);
  });

  it("should validate 'author' column properties", () => {
    validateObjectToHaveProperty(bookMock._defaults, "author");
    validateObjectToHaveProperty(bookMock._defaults.author, "type");
    validateObjectToHaveProperty(bookMock._defaults.author, "allowNull");
    validateMatchingStringValues(bookMock._defaults.author.type.key, /string/i);
    validateBooleanValues(bookMock._defaults.author.allowNull, false);
  });
});
