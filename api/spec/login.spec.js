const request = require("request");
const assert = require("assert");


const BASE_URL = `${process.env.SERVER_URL}:${process.env.PORT}`
console.log(BASE_URL);


describe("Login", function () {

    beforeEach(function() {
      process.env.NODE_ENV = "login-test";  
    });

    afterEach(function() {
        process.env.NODE_ENV = "test";
    });
    
    const mocksuccessfulLogin = {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    };

    const mockFailedLoginUsername = {
        username: 'abc@kainos.com',
        password: '12345!abc'
    };

    const mockFailedLoginPassword = {
        username: process.env.USERNAME,
        password: 'abc'
    };

    it("Checking successful login", function () {
        request.post(`${BASE_URL}/login`, {form: mocksuccessfulLogin}, (e, r, b) => {
            expect(r.statusCode).toBe(200);
        });
    });

    it("Checking wrong username login", function () {
        request.post(`${BASE_URL}/login`, {form: mockFailedLoginUsername}, (e, r, b) => {
            let body = JSON.parse(b);
            expect(body).toEqual({
                message: "Wrong username"
            });
        });
    });

    it("Checking worng password login", function () {
        request.post(`${BASE_URL}/login`, {form: mockFailedLoginPassword}, (e, r, b) => {
            let body = JSON.parse(b);
            expect(body).toEqual({
                message: "Wrong password"
            });
        });
    });

});
