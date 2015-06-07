/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var assert = require("assert");
var notifier = require("../notification/notification");
var userData = require("../config/userData");
var userConfig = require("../config/reloadConfig");
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
            items: [],
            isSearchMode: false,
            displayItems: []
        },
        methods: {
            selectPrevItem: function () {
                if (this.selectedItem == null) {
                    return;
                }
                var items = this.displayItems;
                var currentIndex = items.indexOf(this.selectedItem);
                if (currentIndex !== -1 && 0 <= currentIndex - 1) {
                    this.$root.loadHTMLView(items[currentIndex - 1]);
                }
            },
            selectNextItem: function () {
                var items = this.displayItems;
                if (this.selectedItem == null) {
                    if (items.length > 0) {
                        this.$root.loadHTMLView(items[0]);
                    }
                    return;
                }
                var currentIndex = items.indexOf(this.selectedItem);
                if (currentIndex !== -1 && items.length > currentIndex + 1) {
                    var nextItem = items[currentIndex + 1];
                    this.$root.loadHTMLView(nextItem);
                }
            },
            loadHTMLView: function (item) {
                this.selectedItem = item.$data || item;// raw data
                frameController.loadURL(item.html_url);
                if (item.request_url != null) {
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

function sortDate(aItem, bItem) {
    var a = new Date(aItem.date),
        b = new Date(bItem.date);
    return (b.getTime() - a.getTime());
}

/**
 * if the item is filtered, then return true.
 * @param item
 * @returns {boolean}
 */
function userFilter(item) {
    var filterScriptPath = userConfig.getFilterScriptPath();
    if (filterScriptPath == null) {
        return false;
    }
    var canFilter = require(filterScriptPath);
    return canFilter(item);
}

function mergeData(list) {
    var existItems = listView.items;
    var existKeys = _.pluck(existItems, "id");
    var newItems = list.filter(function (item) {
        return !_.contains(existKeys, item.id);
    });
    console.log("new Item : " + newItems.length);
    if (newItems.length === 0) {
        return;
    }
    if (existItems.length !== 0) {
        var userFilteredItems = newItems.filter(userFilter);
        userFilteredItems.forEach(function (item) {
            notifier.sendNotification({
                id: item.id,
                title: item.repo_name,
                icon: item.avatar_url,
                text: item.body,
                url: item.html_url
            }, function (error) {
                if (error) {
                    console.error("Growl Error", error);
                }
            });
        });
    }
    var mergeItem = existItems.concat(newItems);
    listView.items = mergeItem.sort(sortDate);
}

function reloadData() {
    if (isSearchMode()) {
        return;
    }
    listView.displayItems = listView.items;
}
function filterByWord(word) {
    /*  Filter target

        "user_name"
        "repo_name"
        "html_url"
        "body"
     */
    function escapeRegExp(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    var regexp = new RegExp(escapeRegExp(word), "i");
    listView.displayItems = listView.items.filter(function (item) {
        return [item.user_name, item.repo_name, item.html_url, item.body].some(function (target) {
            return regexp.test(target);
        })
    });
}
function isSearchMode() {
    return listView.isSearchMode;
}
function toggleSearchMode() {
    listView.isSearchMode = !listView.isSearchMode;
    if (!listView.isSearchMode) {
        // remove search word when no search mode.
        reloadData();
    } else {
        listView.selectedItem = null;
    }
}

function indexOfItem(item) {
    assert(listView != null, "listView doesn't initialize. Please call `reloadView`");
    var items = listView.$data.displayItems;
    return items.indexOf(item);
}
function elementAtIndex(currentIndex) {
    var target = listView.$el;
    return target.children[currentIndex];
}

notifier.addClickCallback(function (options) {
    var gui = global.window.nwDispatcher.requireNwGui();
    var win = gui.Window.get();
    win.focus();
    var itemID = options.id;
    var matchItems = listView.displayItems.filter(function (item) {
        return item.id === itemID;
    });
    if (matchItems.length > 0) {
        listView.loadHTMLView(matchItems[0]);
    }
});

module.exports.elementAtIndex = elementAtIndex;
module.exports.indexOfItem = indexOfItem;
module.exports.mergeData = mergeData;
module.exports.reloadData = reloadData;
module.exports.reloadView = reloadView;
module.exports.filterByWord = filterByWord;
module.exports.toggleSearchMode = toggleSearchMode;
module.exports.isSearchMode = isSearchMode;
