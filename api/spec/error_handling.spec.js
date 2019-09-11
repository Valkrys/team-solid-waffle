const request = require("request");

require("dotenv").config();
const API_SERVER = process.env.API_SERVER;

describe("Server", () => {
    var server;
    
    beforeAll(() => {
        server = require("../");
    });


    describe("GET /keyDetails/:userID with ID not in table", () => {
        var data = {};
        beforeAll((done) => {
            request.get(API_SERVER + "/keyDetails/100", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 404", () => {
            expect(data.status).toBe(404);
        });

        it("check JSON object returned should be error message", function () {
            var jsonObject = JSON.parse(data.body);

            expect(jsonObject).toEqual(jasmine.objectContaining({
                message:  "SQL query returns 0 rows or was NULL."
            }));
        });
    });

    describe("GET /roleSpecification/:jobFamily/:capabilityName/:bandName with combination not in table", () => {
        var data = {};
        beforeAll((done) => {
            request.get(API_SERVER + "/roleSpecification/Technical/UX_Designer/Senior", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 404", () => {
            expect(data.status).toBe(404);
        });

        it("check JSON object returned should be error message", function () {
            var jsonObject = JSON.parse(data.body);

            expect(jsonObject).toEqual(jasmine.objectContaining({
                message:  "SQL query returns 0 rows or was NULL."
            }));
        });
    });

    // TODO: login and userIDs to function properly
    xdescribe("GET /user_role", () => {
        var data = {};
        beforeAll((done) => {
            request.get(API_SERVER + "/user_role", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        xit("Status 404", () => {
            expect(data.status).toBe(404);
        });

        xit("check JSON object returned should be error message", function () {
            var jsonObject = JSON.parse(data.body);

            expect(jsonObject).toEqual(jasmine.objectContaining({
                message:  "SQL query returns 0 rows or was NULL."
            }));
        });
    });
});
