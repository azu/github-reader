/**
 * Created by azu on 2014/04/27.
 * LICENSE : MIT
 */
"use strict";
var assert = require("assert");
var Vue = require('vue');
var frameController = require("./frameController");
var listView;
function reloadView() {
    listView = new Vue({
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
                frameController.loadURL(item.html_url);
            }
        }
    });
    return listView
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
module.exports.reloadView = reloadView;
module.exports.indexOfItem = indexOfItem;