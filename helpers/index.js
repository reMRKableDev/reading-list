module.exports = {
  isObjectEmpty: (object) => {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  },

  isObjectPropertyEmpty: (object) =>
    Object.values(object).some((key) => key === null || key === ""),

  isNotNumber: (incomingId) => isNaN(incomingId),
};
