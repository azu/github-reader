/**
 * Created by azu on 2014/04/24.
 * LICENSE : MIT
 */
"use strict";
var userData = require("./config/userData");
module.exports = function () {
    if (userData.hasUserData()) {
        require("./main/mainController")();
    } else {
        window.open('./view/oauth-token.html', '_blank', 'width=400,height=400');
    }
};