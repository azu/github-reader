/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var Vue = require('vue');
var headerView;

function reloadView() {
    headerView = new Vue({
        el: '#comment-preview-header',
        data: {
            "avatar_url": "",
            "user_name": "",
            "body": ""
        }
    });
    return headerView;
}
function updateWithItem(item) {
    headerView.avatar_url = item.avatar_url;
    headerView.user_name = item.user_name;
    headerView.body = item.body;
}
module.exports.reloadView = reloadView;
module.exports.updateWithItem = updateWithItem;