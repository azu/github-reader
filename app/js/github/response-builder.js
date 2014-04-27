/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var parseGithubEvent = require("parse-github-event");
function buildEvents(events) {
    require("assert")(Array.isArray(events));
    return events.map(function (event) {
        var parsedEvent = parseGithubEvent.parse(event);
        return {
            "id": event.id,// github global event id
            "user_name": event.actor.login,
            "avatar_url": event.actor.avatar_url,
            "title": parseGithubEvent.compile(event),
            "html_url": parsedEvent.html_url,
            "body": require("./parse-event-body").parseEventBody(event) || parseGithubEvent.compile(event)
        };
    })
}
module.exports.buildEvents = buildEvents;