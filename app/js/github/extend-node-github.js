/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";

function applyNotificationExtend(Client) {
    Client.prototype.ex_notifications = function (options, callback) {
        var client = this;
        // base block
        var block = {
            url: "/notifications",
            method: "GET",
            params: options
        };
        client.httpSend(options, block, function (err, res) {
            if (err) {
                return self.sendError(err, null, msg, callback);
            }

            var ret;
            try {
                ret = res.data && JSON.parse(res.data);
            }
            catch (ex) {
                if (callback) {
                    callback(new error.InternalServerError(ex.message), res);
                }
                return;
            }

            if (!ret) {
                ret = {};
            }
            if (!ret.meta) {
                ret.meta = {};
            }
            var headers = [
                "x-ratelimit-limit", "x-ratelimit-remaining", "x-oauth-scopes", "link", "location", "last-modified",
                "etag",
                "status"
            ];
            headers.forEach(function (header) {
                if (res.headers[header]) {
                    ret.meta[header] = res.headers[header];
                }
            });
            if (callback) {
                callback(null, ret);
            }
        });
    }
}
module.exports = applyNotificationExtend;