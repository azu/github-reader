var Octokit = require("octokit");
var userData = require("../config/userData");
var github = Octokit.new({
    token: userData.getUserData().token,
    auth: "oauth"
});
module.exports = github;