"use strict";
var saveButton = document.getElementById("js-save");
var userData = require("./js/config/userData");
var userConfig = require("./js/config/reloadConfig");
var Vue = require("vue");
var view = new Vue({
    el: '#config-content',
    data: {
        name: "",
        token: "",
        timeInterval: 60 * 1000
    },
    methods: {}
});
function didLodView() {
    var user = userData.getUserData();
    view.name = user.name;
    view.token = user.token;
    view.timeInterval = userConfig.getAutoReloadTime();
}
function saveUserData(name, token) {
    userData.setUserData({
        name: name,
        token: token
    })
}
saveButton.addEventListener("click", function (event) {
    if (view.name && view.token) {
        saveUserData(view.name, view.token);
    }
    var interval = parseInt(view.timeInterval, 10);
    if (!isNaN(interval)) {
        userConfig.setAutoReloadTime(interval);
    }
    window.close();
});

(function () {
    didLodView();
})();