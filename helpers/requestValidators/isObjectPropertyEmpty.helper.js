module.exports = (object) =>
  Object.values(object).some((key) => key === null || key === "");
