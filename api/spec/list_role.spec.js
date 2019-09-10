const request = require("request");
const assert = require("assert");

describe("Server", () => {
  var server;
  beforeAll(() => {
      server = require("../");
  });


describe("GET /roles", () => {
    var data = {};
    beforeAll((done) => {
        request.get("http://localhost:8002/roles", (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        });
    });

    it("Status 200", () => {
        expect(data.status).toBe(200);
    });

    it("matches objects with the expect key/value pairs", function() {
        var jsonArray = JSON.parse(data.body);
        var jsonObject = jsonArray[0];

        var expectedKeys = ["roleName", "capabilityName", "bandName", "jobfamilyName"];
        var keysFromObject = Object.keys(jsonObject);
        for(var i = 0; i < expectedKeys.length;i++) {
           expect(keysFromObject).toContain(expectedKeys[i])
        }
    });

    it("check number of rows is same with test data", function() {
        const numberOfRows = 11;
        var jsonArray = JSON.parse(data.body);
        expect(jsonArray.length).toBe(numberOfRows);
    });

  });
});