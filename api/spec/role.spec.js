const request = require('request');
const app = require('../index.js');

const BASE_URL = `${process.env.SERVER_URL}:${process.env.PORT}`

describe("GET /roles", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/roles`, (e, r, b) => {
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
      'roleID',
      'roleName',
      'capabilityID',
      'capabilityName',
      'bandID',
      'bandName',
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

describe("GET /role/1", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/role/1`, (e, r, b) => {
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
      'roleID',
      'roleName',
      'description',
      'capabilityID',
      'capabilityName',
      'bandID',
      'bandName',
      'jobFamilyID',
      'jobFamilyName',
      'responsibilities',
      'training'
    ];
    for (let key of expectedKeys) {
      expect(Object.keys(body)).toContain(key);
    }
  });
});

describe("GET /role/0", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/role/0`, (errr, ress, bodyy) => {
      err = errr;
      res = ress;
      body = JSON.parse(bodyy);
      done();
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

describe("PUT /role/1", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request(
        {
          method: "PUT", 
          uri: `${BASE_URL}/role/1`, 
          body: {roleName: 'Hello world!'}, 
          json: true
        }, 
        (errr, ress, bodyy) => {
      err = errr;
      res = ress;
      body = bodyy;
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
      'roleID',
      'roleName',
      'description',
      'capabilityID',
      'capabilityName',
      'bandID',
      'bandName',
      'jobFamilyID',
      'jobFamilyName',
      'responsibilities',
      'training'
    ];
    for (let key of expectedKeys) {
      expect(Object.keys(body)).toContain(key);
    }
  });

  it("should contain the updated key:value", function () {
    expect(body.roleName).toBe("Hello world!");
  });
});

describe("PUT /role/0", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.put(
        {
          method: "PUT", 
          uri: `${BASE_URL}/role/0`, 
          body: {roleName: 'Hello world!'}, 
          json: true
        }, 
        (errr, ress, bodyy) => {
      err = errr;
      res = ress;
      body = bodyy;
      done();
    });
  });

  it("should not return an error", function () {
    expect(err).toBeUndefined;
  });

  it("should have status code 404", function () {
    expect(res.statusCode).toBe(404);
  });

  it("should have an error message in the body", function() {
    expect(body).toBe('Not Found');
  });
});