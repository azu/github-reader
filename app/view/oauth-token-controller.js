"use strict";
var saveButton = document.getElementById("js-save");
var userData = require("./js/config/userData");
function save(name, token) {
    userData.setUserData({
        name: name,
        token: token
    })
}
saveButton.addEventListener("click", function (event) {
    var name = document.getElementById("name").value;
    var token = document.getElementById("password").value;
    if(name && token) {
        save(name, token);
        window.close();
    }
});
