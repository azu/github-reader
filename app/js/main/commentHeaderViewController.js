/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var Vue = require('vue');
var headerView;
var removeMd = require('remove-markdown');
function reloadView() {
    headerView = new Vue({
        el: '#comment-preview-header',
        data: {
            "avatar_url": "",
            "user_name": "",
            "title": "",
            "body": ""
        },
        filters: {
            removeMd: removeMd
        }
    });
    return headerView;
}
function updateWithItem(item) {
    headerView.avatar_url = item.avatar_url;
    headerView.title = item.title;
    headerView.user_name = item.user_name;
    headerView.body = item.body;
    headerView.repo_name = item.repo_name;
}
module.exports.reloadView = reloadView;
module.exports.updateWithItem = updateWithItem;