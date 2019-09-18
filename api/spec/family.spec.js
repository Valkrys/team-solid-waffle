const request = require('request');
const app = require('../index.js');

const BASE_URL = `${process.env.SERVER_URL}:${process.env.PORT}`

describe("GET /families", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/families`, (e, r, b) => {
      err = e;
      res = r;
      body = JSON.parse(b);
      done();
    });
  });

  it("should not return an error", function () {
    expect(err).toBeUndefined;
  });

  it("should have status code 200", function () {
    expect(res.statusCode).toBe(200);
  });

  it("should have an array as the body", function () {
    expect(Array.isArray(body)).toBeTruthy();
  });

  it("should have roles with correct keys", function () {
    const expectedKeys = [
      'jobFamilyID',
      'jobFamilyName'
    ];
    for (let role of body) {
      for (let key of expectedKeys) {
        expect(Object.keys(role)).toContain(key);
      }
    }
  });
});
