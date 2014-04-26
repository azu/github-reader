"use strict";
var github = require("../../app/js/github/github-login").github;
var login = require("../../app/js/github/github-login").login;
var changeClient = require("../../app/js/github/github-login").changeClient;

describe("Github", function () {
    describe("#changeClient", function () {
        it("should change github client instance", function (done) {
            github = changeClient({
                // required
                version: "3.0.0",
                // optional
                debug: true,
                protocol: "https",
                host: "localhost",
                pathPrefix: "/api/", // for some GHEs
                timeout: 5000
            });
            login();
            github.events.get({}, function (err, res) {
            });
        });
    });
});


