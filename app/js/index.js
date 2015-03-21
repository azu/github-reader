/**
 * Created by azu on 2014/04/24.
 * LICENSE : MIT
 */
"use strict";
var userData = require("./config/userData");
module.exports = function (gui) {
    if (userData.hasUserData()) {
        require("./main/mainController")(gui);
    } else {
        gui.Window.open('./view/user-config.html', '_blank', 'width=400,height=400');
    }
};