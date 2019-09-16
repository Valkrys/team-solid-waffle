const request = require("request");

require("dotenv").config();
const API_SERVER = process.env.API_SERVER;

describe("Server", () => {
    var server;

    beforeAll(() => {
        server = require("..");
    });


    describe("GET /band/:bandID", () => {
        var data = {};
        beforeAll((done) => {
            request.get(API_SERVER + "/band/2", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("bandDetails: matches objects with the expect key/value pairs", function () {
            var jsonObject = JSON.parse(data.body);

            var expectedKeys = ["bandID", "name", "commercial", "communication", "innovation", "customerFocus", "development", "planning", "knowledge", "bandRank", "trainingID", "trainingDescription"];
            var keysFromObject = Object.keys(jsonObject);
            for (var i = 0; i < expectedKeys.length; i++) {
                expect(keysFromObject).toContain(expectedKeys[i])
            }
        });
    })
})
