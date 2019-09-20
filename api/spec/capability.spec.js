const request = require('request');
const app = require('../index.js');

const BASE_URL = `${process.env.SERVER_URL}:${process.env.PORT}`

describe("GET /roles", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/capabilities`, (e, r, b) => {
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
      'capabilityID',
      'capabilityName',
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

describe("GET /capability/1", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/capability/1`, (e, r, b) => {
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

  it("should have correctly formatted body", function () {
    const expectedKeys = [
      'capabilityName',
      'jobFamilyName',
      'firstName',
      'lastName',
      'picture',
      'message'
    ];
    for (let key of expectedKeys) {
      expect(Object.keys(body)).toContain(key);
    }
  });
});

xdescribe("GET /capability/0", function() {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/capability/0`, (e, r, b) => {
      err = e;
      res = r;
      body = JSON.parse(b);
      done();statusCode
    });
  });

  it("should not return an error", function () {
    expect(err).toBeUndefined;
  });

  it("should have status code 404", function () {
    expect(res.statusCode).toBe(404);
  });

  it("should have an error message in the body", function() {
    expect(body).toEqual({
      message: "SQL query returns 0 rows or was NULL."
    });
  });
});
