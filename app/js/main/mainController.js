/**
 * Created by azu on 2014/04/23.
 * LICENSE : MIT
 */
"use strict";
var userData = require("../config/userData");
var scrollController = require("./scrollController");
var commentHeaderController = require("./commentHeaderViewController");
var listController = require("./listViewController");
var inputFocusController = require("./inputFocusController");
var Promise = require("bluebird");
var Mousetrap = require("mousetrap");
// gui is chrome context object
module.exports = function (gui) {
    var commentHeaderView = commentHeaderController.reloadView();
    var listView = listController.reloadView();
    listView.$watch("selectedItem", function (item) {
        if (item == null) {
            return;
        }
        // update header
        commentHeaderController.updateWithItem(item);
        // Scroll position
        scrollController.scrollToTop();
        var currentIndex = listController.indexOfItem(item);
        var cellElement = listController.elementAtIndex(currentIndex);
        if (!cellElement) {
            return;
        }
        window.setTimeout(function () {
            document.getElementById("content-list").scrollTop = cellElement.offsetTop - 50;
        }, 0);
    });
    listView.$watch("searchWord", function (word) {
        listController.filterByWord(word);
    });
    Mousetrap.bind('o', function () {
        var iframeURL = document.getElementById("github-iframe").src;
        if (!iframeURL) {
            return;
        }
        gui.Shell.openExternal(iframeURL);
    });
    Mousetrap.bind('j', function () {
        listView.selectNextItem();
    });
    Mousetrap.bind('k', function () {
        listView.selectPrevItem();
    });
    Mousetrap.bind('r r', function () {
        console.log("reload");
        reloadData();
    });
    ['command+f', 'ctrl+f'].forEach(function (key) {
        Mousetrap.bind(key, function () {
            listController.toggleSearchMode();
            if (listController.isSearchMode()) {
                inputFocusController.focus();
            }
        })
    });
    var timerID = setInterval(reloadData, require("../config/reloadConfig").getAutoReloadTime());
    var githubClient = require("../github/github-client").newClient(userData);

    function reloadData() {
        console.log("reload");
        var eventsPromise = githubClient.eventsAsPromise(userData.getUserData().name);
        var notificationsAsPromise = githubClient.notificationsAsPromise();
        Promise.all([eventsPromise, notificationsAsPromise]).spread(function (events, notifications) {
            var builder = require("../github/response-builder");
            var eventList = builder.buildEvents(events);
            var notificationList = builder.buildNotifications(notifications);
            listController.mergeData(eventList.concat(notificationList));
            listController.reloadData();
        }).catch(function (error) {
            console.log("ReloadData Error", error);
        });
    }

    reloadData();
};
