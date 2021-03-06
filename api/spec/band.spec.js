const request = require('request');
const app = require('../index.js');

const BASE_URL = `${process.env.SERVER_URL}:${process.env.PORT}`

describe("GET /bands", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/bands`, (e, r, b) => {
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
      'bandID',
      'bandName',
      'bandRank'
    ];
    for (let role of body) {
      for (let key of expectedKeys) {
        expect(Object.keys(role)).toContain(key);
      }
    }
  });
});

xdescribe("GET /band/1", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/band/1`, (e, r, b) => {
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
      'bandID',
      'bandName',
      'bandRank'
      // TODO: Add more expected fields
    ];
    for (let key of expectedKeys) {
      expect(Object.keys(body)).toContain(key);
    }
  });
});

xdescribe("GET /band/0", function () {
  let err;
  let res;
  let body;

  beforeAll(function (done) {
    request.get(`${BASE_URL}/band/0`, (e, r, b) => {
      err = e;
      res = r;
      body = JSON.parse(b);
      done();
    });
  });

  it("should not return an error", function () {
    expect(err).toBeUndefined;
  });

  it("should have status code 404", function () {
    expect(res.statusCode).toBe(404);
  });

  it("should have an error message in the body", function () {
    expect(body).toEqual({
      message: "SQL query returns 0 rows or was NULL."
    });
  });
});

xdescribe("POST /band", function () {
    let bandList;

    const mockBand = {
        bandName: 'mockBand',
        bandRank: 8
    };

    it("should have status code 200", function () {
        request.post(`${BASE_URL}/band`, {form: mockBand}, (e, r, b) => {
            expect(r.statusCode).toBe(200);
        });
    });

    // THIS TEST WILL FAIL IF NOT RUN WITH A NEW DATABASE!!
    it("check band data", function () {
        request.get(`${BASE_URL}/bands`, (e, r, b) => {
            console.log(JSON.parse(b).length);
            expect(bandList.length).toBe(JSON.parse(b).length);
        });
    });
});
