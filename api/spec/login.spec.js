const request = require("request");
const assert = require("assert");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../");
    });


    describe("GET /getUser/:username", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8002/getUser/antoniab@kainos.com", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Login: matches objects with the expect key/value pairs", function() {
            var jsonObject = JSON.parse(data.body);

            var expectedKeys = ["userID", "firstName", "lastName", "username", "password", "isAdmin", "roleName"];
            var keysFromObject = Object.keys(jsonObject);
            for(var i=0; i< expectedKeys.length;i++) {
                expect(keysFromObject).toContain(expectedKeys[i])
            }
        });
    });
});
