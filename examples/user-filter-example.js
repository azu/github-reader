// LICENSE : MIT
"use strict";
/*
item
{
            "id": event.id,// github global event id
            "date": event.created_at,
            "user_name": event.actor.login,
            "avatar_url": event.actor.avatar_url,
            "repo_name": event.repo.name,
            "title": parseGithubEvent.compile(event),
            "html_url": parsedEvent.html_url,
            "body": require("./parse-event-body").parseEventBody(event) || parseGithubEvent.compile(event)
}
 */
/**
 * return true == preserve item, return false == ignore item
 * @param item
 * @returns {boolean}
 */
module.exports = function (item) {
    if (item.user_name === "coveralls") {
        return false;
    }
    return true;
};