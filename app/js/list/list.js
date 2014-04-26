/**
 * Created by azu on 2014/04/23.
 * LICENSE : MIT
 */
"use strict";
var Vue = require('vue');
var github = require("../github/github");
var userData = require("../config/userData").getUserData();
var builder = require("parse-github-event");
module.exports = function () {
    var commentHeader = new Vue({
        el: '#comment-preview-header',
        data: {
            "avatar_url": "",
            "user_name": "",
            "body": ""
        }
    });
    var view = new Vue({
        el: '#content-list',
        data: {
            selectedItem: null,
            items: [
                {
                    "avatar_url": "",
                    "user_name": ""
                }
            ]
        },
        methods: {
            selectPrevItem: function () {
                if (this.selectedItem == null) {
                    return;
                }
                var items = this.$data.items;
                var currentIndex = items.indexOf(this.selectedItem);
                if (currentIndex !== -1 && 0 <= currentIndex - 1) {
                    this.$root.loadHTMLView(this.items[currentIndex - 1]);
                }
            },
            selectNextItem: function () {
                if (this.selectedItem == null) {
                    if (this.items.length > 0) {
                        this.$root.loadHTMLView(this.items[0]);
                    }
                    return;
                }
                var items = this.$data.items;
                var currentIndex = items.indexOf(this.selectedItem);
                if (currentIndex !== -1 && items.length > currentIndex + 1) {
                    var nextItem = this.items[currentIndex + 1];
                    this.$root.loadHTMLView(nextItem);
                }
            },
            loadHTMLView: function (item) {
                this.selectedItem = item.$data || item;// raw data
                // update header
                commentHeader.avatar_url = item.avatar_url;
                commentHeader.user_name = item.user_name;
                commentHeader.body = item.body;
                var target = this.$el;
                var items = this.$data.items;
                var currentIndex = items.indexOf(this.selectedItem);
                document.getElementById("content-list").scrollTop = target.children[currentIndex].offsetTop;

                var frame = document.getElementById("github-iframe");
                frame.src = item.html_url;
            }
        }
    });
    window.Mousetrap.bind('j', function () {
        view.selectNextItem();
    });
    window.Mousetrap.bind('k', function () {
        view.selectPrevItem();
    });
    var user = github.getUser(userData.name);
    user.getReceivedEvents().then(function (events) {
        var list = events.map(function (event) {
            console.log(event.payload.comment);
            var parsedEvent = builder.parse(event);
            return {
                "user_name": event.actor.login,
                "avatar_url": event.actor.avatar_url,
                "title": builder.compile(event),
                "html_url": parsedEvent.html_url,
                "body": event.payload.comment && event.payload.comment.body || builder.compile(event)
            };
        });
        view.items = list;

    }).fail(console.log.bind(console));
};
