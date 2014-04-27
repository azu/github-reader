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
            "date": event.created_at,
            "user_name": event.actor.login,
            "avatar_url": event.actor.avatar_url,
            "title": parseGithubEvent.compile(event),
            "html_url": parsedEvent.html_url,
            "body": require("./parse-event-body").parseEventBody(event) || parseGithubEvent.compile(event)
        };
    })
}
function buildNotifications(notifications) {
    require("assert")(Array.isArray(notifications));
    return notifications.map(function (notification) {
        return {
            "id": notification.id,// github global event id
            "date": notification.updated_at,
            "user_name": notification.repository.owner.login,
            "avatar_url": notification.repository.owner.avatar_url,
            "title": notification.repository.full_name,
            "html_url": notification.subject.url.replace(/^https:\/\/api\.github\.com\/repos\/(.*?)\/(pulls|issues)\/(.*?)/, function (all, repo, type, number) {
                return "https://github.com/" + repo + "/" + type.replace("pulls", "pull") + "/" + number
            }),
            "request_url": notification.subject.latest_comment_url,
            "body": notification.subject.title
        };
    })
}
module.exports.buildEvents = buildEvents;
module.exports.buildNotifications = buildNotifications;