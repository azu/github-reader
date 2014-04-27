module modulename
{
    interface Actor
    {
        id:number;
        login:string;
        gravatar_id:string;
        url:string;
        avatar_url:string;
    }

    interface Author
    {
        email:string;
        name:string;
    }

    interface Comment
    {
        url:string;
        html_url:string;
        issue_url:string;
        id:number;
        user:User;
        created_at:string;
        updated_at:string;
        body:string;
    }

    interface Comment1
    {
        url:string;
        id:number;
        diff_hunk:string;
        path:string;
        position:number;
        original_position:number;
        commit_id:string;
        original_commit_id:string;
        user:User;
        body:string;
        created_at:string;
        updated_at:string;
        html_url:string;
        pull_request_url:string;
        _links:Links1;
    }

    interface Commits
    {
        sha:string;
        author:Author;
        message:string;
        distinct:boolean;
        url:string;
    }

    interface Head
    {
        label:string;
        ref:string;
        sha:string;
        user:User;
        repo:Repo1;
    }

    interface Issue
    {
        url:string;
        labels_url:string;
        comments_url:string;
        events_url:string;
        html_url:string;
        id:number;
        number:number;
        title:string;
        user:User;
        labels:any[];
        state:string;
        assignee:string;
        milestone:string;
        comments:number;
        created_at:string;
        updated_at:string;
        closed_at:string;
        body:string;
    }

    interface Issue1
    {
        url:string;
        labels_url:string;
        comments_url:string;
        events_url:string;
        html_url:string;
        id:number;
        number:number;
        title:string;
        user:User;
        labels:Labels[];
        state:string;
        assignee:string;
        milestone:string;
        comments:number;
        created_at:string;
        updated_at:string;
        closed_at:string;
        pull_request:PullRequest;
        body:string;
    }

    interface Labels
    {
        url:string;
        name:string;
        color:string;
    }

    interface Links
    {
        self:Self;
        html:Self;
        issue:Self;
        comments:Self;
        review_comments:Self;
        review_comment:Self;
        commits:Self;
        statuses:Self;
    }

    interface Links1
    {
        self:Self;
        html:Self;
        pull_request:Self;
    }

    interface Payload
    {
        action:string;
        issue:Issue;
        comment:Comment;
    }

    interface Payload1
    {
        action:string;
        issue:Issue;
    }

    interface Payload2
    {
        action:string;
        number:number;
        pull_request:PullRequest1;
    }

    interface Payload3
    {
        comment:Comment1;
    }

    interface Payload4
    {
        push_id:number;
        size:number;
        distinct_size:number;
        ref:string;
        head:string;
        before:string;
        commits:Commits[];
    }

    interface Payload5
    {
        action:string;
    }

    interface Payload6
    {
        ref:string;
        ref_type:string;
        master_branch:string;
        description:string;
        pusher_type:string;
    }

    interface PullRequest
    {
        url:string;
        html_url:string;
        diff_url:string;
        patch_url:string;
    }

    interface PullRequest1
    {
        url:string;
        id:number;
        html_url:string;
        diff_url:string;
        patch_url:string;
        issue_url:string;
        number:number;
        state:string;
        title:string;
        user:User;
        body:string;
        created_at:string;
        updated_at:string;
        closed_at:string;
        merged_at:string;
        merge_commit_sha:string;
        assignee:string;
        milestone:string;
        commits_url:string;
        review_comments_url:string;
        review_comment_url:string;
        comments_url:string;
        statuses_url:string;
        head:Head;
        base:Head;
        _links:Links;
        merged:boolean;
        mergeable:string;
        mergeable_state:string;
        merged_by:string;
        comments:number;
        review_comments:number;
        commits:number;
        additions:number;
        deletions:number;
        changed_files:number;
    }

    interface Repo
    {
        id:number;
        name:string;
        url:string;
    }

    interface Repo1
    {
        id:number;
        name:string;
        full_name:string;
        owner:User;
        private:boolean;
        html_url:string;
        description:string;
        fork:boolean;
        url:string;
        forks_url:string;
        keys_url:string;
        collaborators_url:string;
        teams_url:string;
        hooks_url:string;
        issue_events_url:string;
        events_url:string;
        assignees_url:string;
        branches_url:string;
        tags_url:string;
        blobs_url:string;
        git_tags_url:string;
        git_refs_url:string;
        trees_url:string;
        statuses_url:string;
        languages_url:string;
        stargazers_url:string;
        contributors_url:string;
        subscribers_url:string;
        subscription_url:string;
        commits_url:string;
        git_commits_url:string;
        comments_url:string;
        issue_comment_url:string;
        contents_url:string;
        compare_url:string;
        merges_url:string;
        archive_url:string;
        downloads_url:string;
        issues_url:string;
        pulls_url:string;
        milestones_url:string;
        notifications_url:string;
        labels_url:string;
        releases_url:string;
        created_at:string;
        updated_at:string;
        pushed_at:string;
        git_url:string;
        ssh_url:string;
        clone_url:string;
        svn_url:string;
        homepage:string;
        size:number;
        stargazers_count:number;
        watchers_count:number;
        language:string;
        has_issues:boolean;
        has_downloads:boolean;
        has_wiki:boolean;
        forks_count:number;
        mirror_url:string;
        open_issues_count:number;
        forks:number;
        open_issues:number;
        watchers:number;
        default_branch:string;
    }

    interface Self
    {
        href:string;
    }

    interface User
    {
        login:string;
        id:number;
        avatar_url:string;
        gravatar_id:string;
        url:string;
        html_url:string;
        followers_url:string;
        following_url:string;
        gists_url:string;
        starred_url:string;
        subscriptions_url:string;
        organizations_url:string;
        repos_url:string;
        events_url:string;
        received_events_url:string;
        type:string;
        site_admin:boolean;
    }


}