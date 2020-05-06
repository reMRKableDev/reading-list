module.exports = {
  validateTruthiness: (received) =>
    expect(received).not.toBeNull() && expect(received).toBeTruthy(),

  validateStatusToBeOK: (status) =>
    expect(status).not.toBe(404) && expect(status).toBe(200),

  validateStatusNotFound: (status) =>
    expect(status).not.toBe(200) && expect(status).toBe(404),

  validateObjectDataType: (received) =>
    expect(typeof received).not.toBe("string") &&
    expect(typeof received).toBe("object"),

  validateObjectToHaveProperty: (received, key) =>
    expect(received).not.toHaveProperty("dummy") &&
    expect(received).toHaveProperty(key),

  validateMatchingStringValues: (received1, received2) =>
    expect(received1).not.toMatch("dummy") &&
    expect(received1).toMatch(received2),

  validateBooleanValues: (received, boolean) =>
    expect(received).not.toBe(!boolean) && expect(received).toBe(boolean),
};
