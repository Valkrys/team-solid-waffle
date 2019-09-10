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

describe("GET /band/1", function () {
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

describe("GET /band/0", function () {
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

describe("POST /band", function () {
    let err;
    let res;
    let body;
    let bandList;

    beforeAll(function (done) {

        const mockBand = {
            bandName: 'mockBand',
            communication: 'mockBand',
            innovation: 'mockBand',
            knowledge: 'mockBand',
            responsibilities: 'mockBand',
            trainingID: null,
            bandRank: 8,
        };

        request.post(`${BASE_URL}/band`, {form: mockBand}, (e, r, b) => {
            err = e;
            res = r;
            console.log(body);
            body = JSON.parse(b);
        });

        request.get(`${BASE_URL}/bands`, (get_e, get_r, get_b) => {
            bandList = JSON.parse(get_b);
            done();
        })
    });

    it("should have status code 200", function () {
        expect(res.statusCode).toBe(200);
    });

    it("check band data", function () {
        request.get(`${BASE_URL}/bands`, (e, r, b) => {
            console.log(JSON.parse(b).length);
            expect(bandList.length).toBe(JSON.parse(b).length);
        });
    });
});
