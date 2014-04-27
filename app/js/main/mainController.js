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

        setImmediate(function () {
            document.getElementById("content-list").scrollTop = cellElement.offsetTop - 50;
        });
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
            var builder = require("../github/response-builder");
            var eventList = builder.buildEvents(events);
            var notificationList = builder.buildNotifications(notifications);
            listController.mergeData(eventList);
            listController.mergeData(notificationList);
        }).catch(function (error) {
            console.log("ReloadData Error", error);
        });
    }

    reloadData();
};
