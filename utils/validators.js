module.exports = {
  validateTruthiness: (received) => {
    expect(received).not.toBeNull();
    expect(received).toBeTruthy();
  },

  validateStatusToBeOK: (status) => {
    expect(status).not.toBe(404);
    expect(status).toBe(200);
  },

  validateStatusNotFound: (status) => {
    expect(status).not.toBe(200);
    expect(status).toBe(404);
  },

  validateToHaveBeenCalledWithBadRequest: (status) => {
    expect(status).not.toHaveBeenCalledWith(200);
    expect(status).toHaveBeenCalledWith(400);
  },

  validateToHaveBeenCalledWithOk: (status) => {
    expect(status).not.toHaveBeenCalledWith(500);
    expect(status).toHaveBeenCalledWith(200);
  },

  validateObjectDataType: (received) => {
    expect(typeof received).not.toBe("string");
    expect(typeof received).toBe("object");
  },

  validateObjectToHaveProperty: (received, key) => {
    expect(received).not.toHaveProperty("dummy");
    expect(received).toHaveProperty(key);
  },

  validateMatchingStringValues: (received1, received2) => {
    expect(received1).not.toMatch("dummy");
    expect(received1).toMatch(received2);
  },

  validateBooleanValues: (received, boolean) => {
    expect(received).not.toBe(!boolean);
    expect(received).toBe(boolean);
  },
  validateNumberOfMockCalls: (received, amount) => {
    expect(received).not.toHaveBeenCalledTimes(100);
    expect(received).toHaveBeenCalledTimes(amount);
  },

  validateSendMockCalls: (received, amount) => {
    expect(received.mock.calls).not.toHaveLength(100);
    expect(received.mock.calls).toHaveLength(amount);
  },

  validateNaNResponseMessage: (received) => {
    expect(received).not.toMatch("dummy");
    expect(received).toMatch(
      "The given id was not a number! Please use a number"
    );
  },

  validateEmptyObjectResponseMessage: (received) => {
    expect(received).not.toMatch("dummy");
    expect(received).toMatch("Object cannot be empty");
  },

  validateEmptyPropertyResponseMessage: (received) => {
    expect(received).not.toMatch("dummy");
    expect(received).toMatch("Please fill in all the fields");
  },
};
