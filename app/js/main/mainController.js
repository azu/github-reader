/**
 * Created by azu on 2014/04/23.
 * LICENSE : MIT
 */
"use strict";
var user = require("../config/userData");
var builder = require("parse-github-event");
var scrollController = require("./scrollController");
var commentHeaderController = require("./commentHeaderViewController");
var listController = require("./listViewController");

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

    var client = require("../github/github-client").newClient();

    function reloadData() {
        client.events.getReceived({ user: user.getUserData().name },
            function (error, events) {
                if (error) {
                    return console.log(error);
                }
                var list = events.map(function (event) {
                    var parsedEvent = builder.parse(event);
                    return {
                        "id": event.id,// github global event id
                        "user_name": event.actor.login,
                        "avatar_url": event.actor.avatar_url,
                        "title": builder.compile(event),
                        "html_url": parsedEvent.html_url,
                        "body": require("../github/parse-event-body").parseEventBody(event) || builder.compile(event)
                    };
                });
                listController.mergeData(list);
            }
        );
    }

    reloadData();
};
