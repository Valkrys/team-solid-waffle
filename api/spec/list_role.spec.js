const request = require("request");
const assert = require("assert");

describe("Server", () => {
  var server;
  beforeAll(() => {
      server = require("../");
  });


  describe("GET /job_role_details", () => {
    var data = {};
    beforeAll((done) => {
        request.get("http://localhost:8002/job_role_details", (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        });
    });
    it("matches objects with the expect key/value pairs", function() {
        var jsonArray = JSON.parse(data.body);
        var jsonObject = jsonArray[0];

        var expectedKeys = ["firstName", "roleName"];
        var keysFromObject = Object.keys(jsonObject);
        for(var i=0; i< expectedKeys.length;i++) {
           expect(keysFromObject).toContain(expectedKeys[i])
        }

    });

  });
});