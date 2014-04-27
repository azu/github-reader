/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var assert = require("assert");
var userData = require("../config/userData");
var Vue = require('vue');
var frameController = require("./frameController");
var _ = require("lodash");
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

var listView;
function reloadView() {
    listView = new Vue({
        el: '#content-list',
        data: {
            selectedItem: null,
            items: [
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
                frameController.loadURL(item.html_url);
                if ("request_url" in item) {
                    var options = {
                        url: item.request_url,
                        headers: {
                            'User-Agent': 'github-reader',
                            'Authorization': 'token ' + userData.getUserData().token
                        }
                    };
                    request(options).spread(function (request, body) {
                        var res = JSON.parse(body);
                        if (res.html_url.indexOf("#") !== -1) {
                            frameController.loadURL(res.html_url);
                        }
                    }).catch(function (error) {
                        console.error(error);
                    });
                }
            }
        }
    });
    return listView
}

function mergeData(list) {
    var existItems = listView.items;
    var existKeys = _.pluck(existItems, "id");
    var newItems = list.filter(function (item) {
        return !_.contains(existKeys, item.id);
    });
    var mergeItem = existItems.concat(newItems);
    listView.items = _.sortBy(mergeItem, "date");
}


function indexOfItem(item) {
    assert(listView != null, "listView doesn't initialize. Please call `reloadView`")
    var items = listView.$data.items;
    return items.indexOf(item);
}
function elementAtIndex(currentIndex) {
    var target = listView.$el;
    return target.children[currentIndex];
}
module.exports.elementAtIndex = elementAtIndex;
module.exports.indexOfItem = indexOfItem;
module.exports.mergeData = mergeData;
module.exports.reloadView = reloadView;
