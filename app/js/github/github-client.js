var Promise = require("bluebird");
var GitHubApi = require("github");
require("./extend-node-github")(GitHubApi);
function newClient(userData) {
    var githubClient = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        timeout: 5000
    });
    githubClient.authenticate({
        type: "oauth",
        token: userData.getUserData().token
    });
    return new GithubClientPromise(githubClient);
}
function GithubClientPromise(client) {
    this.client = client;
}
GithubClientPromise.prototype.eventsAsPromise = function (user) {
    var client = this.client;
    return new Promise(function (resolve, reject) {
        client.events.getReceived({ user: user },
            function (error, events) {
                if (error) {
                    return reject(error);
                }
                resolve(events);
            });
    });
};

GithubClientPromise.prototype.notificationsAsPromise = function (callback) {
    var client = this.client;
    return new Promise(function (resolve, reject) {
        client.ex_notifications(function (error, events) {
            if (error) {
                return reject(error);
            }
            resolve(events);
        });
    });
};
module.exports.newClient = newClient;
