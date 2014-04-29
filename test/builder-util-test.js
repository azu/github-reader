/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";
var builderUtil = require("../app/js/github/builder-util");
var assert = require("power-assert");
describe("builder-util", function () {
    describe("#normalizeResponseAPIURL", function () {
        context("when type is pull-request", function () {
            var URL = "https://api.github.com/repos/jshint/jshint/pulls/1627";
            var expectedURL = "https://github.com/jshint/jshint/pull/1627";
            it("should convert accessible URL", function () {
                assert.equal(builderUtil.normalizeResponseAPIURL(URL), expectedURL);
            });
        });
        context("when type is issues", function () {
            var URL = "https://api.github.com/repos/squarefrog/UIDeviceIdentifier/issues/5";
            var expectedURL = "https://github.com/squarefrog/UIDeviceIdentifier/issues/5";
            it("should convert accessible URL", function () {
                assert.equal(builderUtil.normalizeResponseAPIURL(URL), expectedURL);
            });
        });
    });
});