/**
 * Created by azu on 2014/05/04.
 * LICENSE : MIT
 */
"use strict";
function _focusHandler(event) {
    event.target.focus();
    document.querySelector(".content-list-filter-input").removeEventListener("transitionend", _focusHandler);
}
function focus() {
    var node = document.querySelector(".content-list-filter-input");
    node.value = "";
    node.addEventListener("transitionend", _focusHandler, false);
}
module.exports.focus = focus;