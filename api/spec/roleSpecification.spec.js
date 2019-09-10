const request = require("request");
const assert = require("assert");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../");
    });


    describe("GET /detail/:jobFamily/:capabilityName/:bandName", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8002/detail/Technical/Software-Engineering/Trainee", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("roleSpecification: matches objects with the expect key/value pairs", function() {
            var jsonObject = JSON.parse(data.body);

            var expectedKeys = ["description", "responsibilities", "training"];
            var keysFromObject = Object.keys(jsonObject);
            for(var i=0; i< expectedKeys.length;i++) {
                expect(keysFromObject).toContain(expectedKeys[i])
            }
        });
    });
});