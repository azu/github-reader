/**
 * Created by azu on 2014/04/23.
 * LICENSE : MIT
 */
"use strict";
var Vue = require('vue');
var github = require("../github/github");
var user = require("../config/userData");
var builder = require("parse-github-event");
var scrollController = require("./scrollController");
var commentHeaderController = require("./commentHeaderViewController");
var listController = require("./listViewController");

module.exports = function () {
    var commentHeaderView = commentHeaderController.reloadView();
    var listView = listController.reloadView();
    listView.$watch("selectedItem", function (item) {
        scrollController.scrollToTop();
        // update header
        commentHeaderController.updateWithItem(item);
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
    var githubUser = github.getUser(user.getUserData().name);
    githubUser.getReceivedEvents().then(function (events) {
        var list = events.map(function (event) {
            var parsedEvent = builder.parse(event);
            return {
                "user_name": event.actor.login,
                "avatar_url": event.actor.avatar_url,
                "title": builder.compile(event),
                "html_url": parsedEvent.html_url,
                "body": event.payload.comment && event.payload.comment.body || builder.compile(event)
            };
        });
        listView.items = list;

    }).fail(console.log.bind(console));
};
