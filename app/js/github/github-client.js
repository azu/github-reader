var userData = require("../config/userData");
function newClient() {
    var GitHubApi = require("github");
    var client = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        timeout: 5000
    });
    client.authenticate({
        type: "oauth",
        token: userData.getUserData().token
    });
    return client;
}
module.exports.newClient = newClient;