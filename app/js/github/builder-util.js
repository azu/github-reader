/**
 * Created by azu on 2014/04/29.
 * LICENSE : MIT
 */
"use strict";
function normalizeResponseAPIURL(url) {
    return url.replace(/^https:\/\/api\.github\.com\/repos\/(.*?)\/(commits|pulls|issues)\/(.*?)/, function (all, repo, type, number) {
        return "https://github.com/" + repo + "/" + type.replace("pulls", "pull") + "/" + number
    })
}
module.exports.normalizeResponseAPIURL = normalizeResponseAPIURL;