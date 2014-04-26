"use strict";
/**
 * Github EventType
 * @readonly
 * @enum {string}
 */
var GithubEventTypes = {
    CommitCommentEvent: "CommitCommentEvent",
    CreateEvent: "CreateEvent",
    DeleteEvent: "DeleteEvent",
    DownloadEvent: "DownloadEvent",
    FollowEvent: "FollowEvent",
    ForkEvent: "ForkEvent",
    ForkApplyEvent: "ForkApplyEvent",
    GistEvent: "GistEvent",
    GollumEvent: "GollumEvent",
    IssueCommentEvent: "IssueCommentEvent",
    IssuesEvent: "IssuesEvent",
    MemberEvent: "MemberEvent",
    PublicEvent: "PublicEvent",
    PullRequestEvent: "PullRequestEvent",
    PullRequestReviewCommentEvent: "PullRequestReviewCommentEvent",
    PushEvent: "PushEvent",
    TeamAddEvent: "TeamAddEvent",
    WatchEvent: "WatchEvent"
};
module.exports.GithubEventTypes = GithubEventTypes;