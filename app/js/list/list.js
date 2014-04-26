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
            "avatar_url" : "",
            "user_name": "",
            "body":" あーあーあーーあーあーあーあーs−だーsてあてktけ；t"
        }
    });
    var view = new Vue({
        el: '#content-list',
        data: {
            selectedItem: null,
            items: []
        },
        isHidden: function () {
            console.log(this);
            return items.length === 0;
        },
        methods: {
            loadHTMLView: function (item) {
                document.documentElement.scrollTop = 0;
                var frame = document.getElementById("github-iframe");
                frame.src = item.html_url;
                this.selectedItem = item;
                // update header
                commentHeader.avatar_url = item.avatar_url;
                commentHeader.user_name = item.user_name;
            }
        }
    });

    var user = github.getUser(userData.name);
    user.getReceivedEvents().then(function (events) {
        var list = events.map(function (event) {
            var parsedEvent = builder.parse(event);
            return {
                "user_name": event.actor.login,
                "avatar_url": event.actor.avatar_url,
                "title": builder.compile(event),
                "html_url": parsedEvent.html_url
            };
        });
        view.items = list;

    }).fail(console.log.bind(console));
};
