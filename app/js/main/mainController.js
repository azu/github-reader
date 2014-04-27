/**
 * Created by azu on 2014/04/23.
 * LICENSE : MIT
 */
"use strict";
var userData = require("../config/userData");
var scrollController = require("./scrollController");
var commentHeaderController = require("./commentHeaderViewController");
var listController = require("./listViewController");
var Promise = require("bluebird");
module.exports = function () {
    var commentHeaderView = commentHeaderController.reloadView();
    var listView = listController.reloadView();
    listView.$watch("selectedItem", function (item) {
        // update header
        commentHeaderController.updateWithItem(item);
        // Scroll position
        scrollController.scrollToTop();
        var currentIndex = listController.indexOfItem(item);
        var cellElement = listController.elementAtIndex(currentIndex);
        document.getElementById("content-list").scrollTop = cellElement.offsetTop;
    });
    window.Mousetrap.bind('j', function () {
        listView.selectNextItem();
    });
    window.Mousetrap.bind('k', function () {
        listView.selectPrevItem();
    });
    window.Mousetrap.bind('r r', function () {
        console.log("reload");
        reloadData();
    });

    var githubClient = require("../github/github-client").newClient(userData);

    function reloadData() {
        var eventsPromise = githubClient.eventsAsPromise(userData.getUserData().name);
        var notificationsAsPromise = githubClient.notificationsAsPromise();
        Promise.all([eventsPromise, notificationsAsPromise]).spread(function (events, notifications) {
            var parseGithubEvent = require("parse-github-event");

            var list = events.map(function (event) {
                var parsedEvent = parseGithubEvent.parse(event);
                return {
                    "id": event.id,// github global event id
                    "user_name": event.actor.login,
                    "avatar_url": event.actor.avatar_url,
                    "title": parseGithubEvent.compile(event),
                    "html_url": parsedEvent.html_url,
                    "body": require("../github/parse-event-body").parseEventBody(event) || parseGithubEvent.compile(event)
                };
            });
            listController.mergeData(list);
        }).catch(function (error) {
            console.log("ReloadData Error", error);
        });
    }

    reloadData();
};
