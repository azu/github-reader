"use strict";
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
        });
    });
});


