module.exports = {
  validateTruthiness: (object) =>
    expect(object).not.toBeNull() && expect(object).toBeTruthy(),

  validateStatusToBeOK: (status) =>
    expect(status).not.toBe(404) && expect(status).toBe(200),

  validateStatusNotFound: (status) =>
    expect(status).not.toBe(200) && expect(status).toBe(404),

  validateObjectDataType: (object) =>
    expect(typeof object).toBe("object") &&
    expect(typeof object).not.toBe("string"),
};
