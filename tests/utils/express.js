module.exports = {
  mockRequest: (body = {}, params = {}) => {
    const req = { ...body, params };
    req.body = jest.fn().mockReturnValue(req);

    return req;
  },

  mockResponse: (body) => {
    const res = { ...body };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);

    return res;
  },

  mockNext: () => jest.fn(),
};
