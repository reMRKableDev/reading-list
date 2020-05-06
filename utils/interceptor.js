/**
 * Mock implementations for Request, Response, and Server.
 * @module mockImplementations
 * @type {Object}     Interceptors
 * @type {function}   Interceptors.mockRequest
 * @type {function}   Interceptors.mockResponse
 * @type {function}   Interceptors.mockServer
 */
module.exports = {
  mockRequest: () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
  },

  mockResponse: () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.render = jest.fn().mockReturnValue(res);
    return res;
  },

  mockServer: () => {
    const server = {};
    server.listen = jest.fn();
    return server;
  },
};
