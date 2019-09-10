const request = require("request");
const assert = require("assert");

describe("Server", () => {
  var server;
  beforeAll(() => {
      server = require("..");
  });


  describe("GET /capabilities_roles", () => {
    var data = {};
    beforeAll((done) => {
        request.get("http://localhost:8002/user_role", (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        });
    });
    it("matches objects with the expect key/value pairs", function() {
        var jsonArray = JSON.parse(data.body);
        var jsonObject = jsonArray[0];
        var expectedKeys = ["bandName", "roleName", "bandRank"];
        var keysFromObject = Object.keys(jsonObject);
        for(var i=0; i< expectedKeys.length;i++) {
           expect(keysFromObject).toContain(expectedKeys[i])
        }

         
    });

  });
});