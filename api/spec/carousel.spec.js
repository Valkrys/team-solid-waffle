const request = require("request");
const assert = require("assert");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../");
    });


    describe("GET /carousel/Associate", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8002/carousel/Associate/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 200", () => {
            expect(data.status).toBe(200);
        });

        it("matches objects with the expect key/value pairs", function () {
            var jsonArray = JSON.parse(data.body);
            var jsonObject = jsonArray[0];

            var expectedKeys = ["roleName", "capabilityName", "jobFamilyName"];
            var keysFromObject = Object.keys(jsonObject);
            for (var i = 0; i < expectedKeys.length; i++) {
                expect(keysFromObject).toContain(expectedKeys[i])
            }
        });

        it("check number of rows is same with test data", function () {
            const numberOfRows = 2;
            var jsonArray = JSON.parse(data.body);
            expect(jsonArray.length).toBe(numberOfRows);
        });

        it("check jobFamilyName to see if its correct", function () {
            var jsonArray = JSON.parse(data.body);

            for (var i = 0; i < jsonArray.length; i++) {
                var record = jsonArray[i];
                var valuesofJSON = Object.values(record);
                expect(valuesofJSON[2]).toContain("Technical");
            }
        });

        it("check see all capabilities are unique", function () {
            var jsonArray = JSON.parse(data.body);
            var bandNameArr = [];

            for (var i = 0; i < jsonArray.length; i++) {
                var record = jsonArray[i];
                var valuesofJSON = Object.values(record);
                bandNameArr.push(valuesofJSON[1]);
            }
            var bandNameArrUnique = bandNameArr.filter(onlyUnique);
            expect(bandNameArr.length).toBe(bandNameArrUnique.length);

        });

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }


    });

    describe("GET /carousel/Associate", () => {
        var data = {};
        beforeAll((done) => {
            request.get("http://localhost:8002/carousel/Associate/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it("Status 200", () => {
            expect(data.status).toBe(200);
        });

        it("checks if jobFamily belongs", function () {
            var jsonArray = JSON.parse(data.body);
            var bandNameArr = [];

            for (var i = 0; i < jsonArray.length; i++) {
                var record = jsonArray[i];
                var valuesofJSON = Object.values(record);
                bandNameArr.push(valuesofJSON[2]);
            }

            var expectedJobFamily = ["Technical", "Experience Design", "Consulting", "Central Services Teams", "Sales & Marketing", "Management"];
            
            for (var i = 0; i < bandNameArr.length; i++) {
                expect(expectedJobFamily).toContain(bandNameArr[i])
            }
        });


    });

    
});