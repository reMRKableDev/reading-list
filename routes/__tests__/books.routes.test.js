const router = require("../books.routes");

const {
  createNewBook,
  readAllBooks,
  readOneBook,
  readAllBooksInReadingList,
  updateBook,
  deleteBook,
} = require("../../controllers/book.controllers");

const {
  validateTruthiness,
  validateControllerUsed,
  validateMatchingStringValues,
} = require("../../utils/validators");

describe("Books routes unit tests", () => {
  it("should validate the 'POST' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[0].route.methods.post);
    validateMatchingStringValues(routerArr[0].route.path, "/");
    validateControllerUsed(routerArr[0].route.stack[0].handle, createNewBook);
  });

  it("should validate the 'GET' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[1].route.methods.get);
    validateMatchingStringValues(routerArr[1].route.path, "/");
    validateControllerUsed(routerArr[1].route.stack[0].handle, readAllBooks);
  });

  it("should validate the 'GET' route with path '/:id' ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[2].route.methods.get);
    validateMatchingStringValues(routerArr[2].route.path, "/:id");
    validateControllerUsed(routerArr[2].route.stack[0].handle, readOneBook);
  });

  it("should validate the 'GET' route with path '/readList/:id' ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[3].route.methods.get);
    validateMatchingStringValues(routerArr[3].route.path, "/readList/:id");
    validateControllerUsed(
      routerArr[3].route.stack[0].handle,
      readAllBooksInReadingList
    );
  });

  it("should validate the 'PUT' route", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[4].route.methods.put);
    validateMatchingStringValues(routerArr[4].route.path, "/:id");
    validateControllerUsed(routerArr[4].route.stack[0].handle, updateBook);
  });

  it("should validate the 'DELETE' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[5].route.methods.delete);
    validateMatchingStringValues(routerArr[5].route.path, "/:id");
    validateControllerUsed(routerArr[5].route.stack[0].handle, deleteBook);
  });
});
