/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
// https://developer.github.com/v3/repos/commits/
function compileFormPushEvent(event) {
    var commits = event.payload.commits;
    return commits.map(function (commit) {
        return "- " + commit.message;
    }).join("\n");
}

function parseEventBody(event) {
    var payload = event.payload;
    if (payload.comment) {
        return payload.comment.body;
    } else if (payload.issue) {
        return payload.issue.body;
    } else if (event.type === "PushEvent") {
        return compileFormPushEvent(event);
    }
    return null;
}

module.exports.parseEventBody = parseEventBody;