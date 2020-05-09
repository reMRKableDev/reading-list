const router = require("../readingList.routes");

const {
  createNewReadingList,
  readAllReadingLists,
  readOneReadingList,
  updateReadingList,
  deleteReadingList,
} = require("../../controllers/readingList.controllers");

const {
  validateTruthiness,
  validateControllerUsed,
  validateMatchingStringValues,
} = require("../../utils/validators");

describe("Reading list routes unit tests", () => {
  it("should validate the 'POST' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[0].route.methods.post);
    validateMatchingStringValues(routerArr[0].route.path, "/");
    validateControllerUsed(
      routerArr[0].route.stack[0].handle,
      createNewReadingList
    );
  });

  it("should validate the 'GET' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[1].route.methods.get);
    validateMatchingStringValues(routerArr[1].route.path, "/");
    validateControllerUsed(
      routerArr[1].route.stack[0].handle,
      readAllReadingLists
    );
  });

  it("should validate the 'GET' route with path '/:id' ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[2].route.methods.get);
    validateMatchingStringValues(routerArr[2].route.path, "/:id");
    validateControllerUsed(
      routerArr[2].route.stack[0].handle,
      readOneReadingList
    );
  });

  it("should validate the 'PUT' route", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[3].route.methods.put);
    validateMatchingStringValues(routerArr[3].route.path, "/:id");
    validateControllerUsed(
      routerArr[3].route.stack[0].handle,
      updateReadingList
    );
  });

  it("should validate the 'DELETE' route ", () => {
    const routerArr = router.stack;

    validateTruthiness(routerArr[4].route.methods.delete);
    validateMatchingStringValues(routerArr[4].route.path, "/:id");
    validateControllerUsed(
      routerArr[4].route.stack[0].handle,
      deleteReadingList
    );
  });
});
