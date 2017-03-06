/*
 * github-activity.js
 *
 * Updates a panel widget with the most recent GitHub event activity for a given
 * GitHub user using the GitHub API. This script depends on JQuery, Bootstrap and
 * Octicon.
 *
 *
 * @author Jonathan Pearlin
 * @date April 12, 2014
 *
 * Customized by Kleis Auke Wolthuizen for his personal website (http://kleisauke.nl/).
 */

/**
 * Capitalizes the first letter of the string.
 * @returns The capitalized string.
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Load the GitHub activity widget on the document ready event.
$(document).ready(function() {
    $.get("https://api.github.com/users/kleisauke/events", function(data) {
        // Remove the "Loading..." place holder.
        $('#activity > #loading').remove();

        // Find the activity list from the DOM.
        var activityList = $('#activity > ul');

        // Counter used to determine when we have found the desired number of events for display.
        var count = 0;

        // Loop over each retrieved GitHub event and process.
        $.each(data, function(i, githubEvent) {
            // The icon font to be displayed with the event.
            var octicon = "";
            // The hyper link to be applied to the displayed event.
            var link = "";
            // The text to be displayed with the event.
            var text = "";

            // Only show 5 events. Not all types of GitHub events are implemented here.
            // for the full list, see https://developer.github.com/v3/activity/events/types/
            if (count < 5) {
                if (githubEvent.type == 'CommitCommentEvent') {
                    octicon = "octicon-comment";
                    link = githubEvent.payload.comment.html_url;
                    text = "Commented on " + githubEvent.repo.name + "/commit/" + githubEvent.payload.comment.commit_id;
                } else if (githubEvent.type == 'CreateEvent') {
                    octicon = "octicon-repo-create";
                    link = "http://github.com/" + githubEvent.repo.name;
                    text = "Created repository " + githubEvent.repo.name;
                } else if (githubEvent.type == 'ForkEvent') {
                    octicon = "octicon-repo-forked";
                    link = githubEvent.payload.forkee.html_url;
                    text = "Forked repository " + githubEvent.repo.name;
                } else if (githubEvent.type == 'IssuesEvent') {
                    octicon = "octicon-issue-" + githubEvent.payload.action;
                    link = githubEvent.payload.issue.html_url;
                    text = githubEvent.payload.action.capitalize() + " issue " + githubEvent.repo.name +
                        "#" + githubEvent.payload.issue.number;
                } else if (githubEvent.type == 'IssueCommentEvent') {
                    octicon = "octicon-comment-discussion";
                    link = githubEvent.payload.issue.html_url;
                    text = "Commented on " + (githubEvent.payload.issue.pull_request != null ? "pull request" : "issue") +
                        " " + githubEvent.repo.name + "#" + githubEvent.payload.issue.number;
                } else if (githubEvent.type == 'PullRequestEvent') {
                    octicon = 'octicon-git-pull-request';
                    link = githubEvent.payload.pull_request.html_url;
                    text = githubEvent.payload.action.capitalize() + " pull request " + githubEvent.repo.name +
                        "#" + githubEvent.payload.number;
                } else if (githubEvent.type == 'PullRequestReviewCommentEvent') {
                    octicon = "octicon-comment";
                    link = githubEvent.payload.comment.html_url;
                    text = "Commented on pull request " + githubEvent.repo.name + "#" +
                        extractPullRequestNumber(githubEvent.payload.comment.pull_request_url);
                } else if (githubEvent.type == 'PushEvent' && !(githubEvent.repo.name == "kleisauke/kleisauke.github.io")) {
                    octicon = "octicon-git-commit";
                    link = "http://github.com/" + githubEvent.repo.name + "/commit/" + githubEvent.payload.head;
                    text = "Pushed to " + normalizeBranch(githubEvent.payload.ref) + " at " + githubEvent.repo.name;
                }

                // If the event is one of the supported types, add a new line item to the HTML panel.
                if (text) {
                    var eventDateHtml = createEventDateHtml(githubEvent.created_at);
                    activityList.append("<li id=\"" + githubEvent.id + "\" class=\"list-group-item list-group-item-action flex-column align-items-start\">" +
                        "<div class=\"d-flex w-100 justify-content-between\">" +
                        "<h5 class=\"mb-1\"><span class=\"octicon " + octicon + "\"></span> <a href=\"" + link + "\" target=\"_blank\">" + text + "</a></h5>" +
                        eventDateHtml +
                        "</div></li>");
                    count++;
                }
            }
        });

        // If no events were found, display the "No recent activity" message.
        if (count == 0) {
            activityList.append("<li class=\"list-group-item list-group-item-action flex-column align-items-start\">" +
                "<div class=\"d-flex w-100 justify-content-between\">" +
                "<h5 class=\"mb-1\"><span class=\"octicon octicon-x\"></span> <a href=\"https://github.com/kleisauke\" target=\"_blank\">No recent activity</a></h5>" +
                "</div></li>");
        }

        // Add a link to the end of the list to see all of the activity on GitHub.com.
        activityList.append("<li class=\"list-group-item list-group-item-action flex-column align-items-start\">" +
            "<div class=\"d-flex w-100 justify-content-between\">" +
            "<h5 class=\"mb-1\"><span class=\"octicon octicon-rss\"></span> <a href=\"https://github.com/kleisauke\" target=\"_blank\">See all activity on GitHub</a></h5>" +
            "</div></li>");
    }).fail(function() {
        $('#activity > #loading').remove();
        $('#activity > ul').append("<li class=\"list-group-item list-group-item-action flex-column align-items-start\">" +
            "<div class=\"d-flex w-100 justify-content-between\">" +
            "<h5 class=\"mb-1\"><span class=\"octicon octicon-alert\"></span> GitHub activity could not be retrieved.</h5>" +
            "</div></li>");
    });
});

/**
 * Generates an HTML snippet that contains a amount of time that
 * has passed between the provided date string and now. This function
 * leverages Moment.js to provide ultimate control over manipulating
 * time and dates.
 *
 * @param createdAt a string representation of a date.
 * @returns The amount of time in prose that has passed between
 *   the provided date and now.
 */
function createEventDateHtml(createdAt) {
    var dateText = moment(createdAt).fromNow();

    return "<small class=\"relativeTime text-mute\">" + dateText + "</small>";
}

/**
 * Extracts the GitHub pull request number from the GitHub API pull request
 * URL.
 * @param A GitHub API pull request URL.
 * @returns The pull request number extracted from the provided URL.
 */
function extractPullRequestNumber(pullRequestUrl) {
    var index = pullRequestUrl.lastIndexOf("/");
    return pullRequestUrl.substring(index + 1);
}

/**
 * Removes the Git prefix from a branch reference. For instance,
 * an input of "refs/head/master" would result in the function
 * returning the value "master".
 * @param branchRef The Git branch reference as a string.
 * @return The normalized branch name with the Git metadata
 *   removed from the branch name.
 */
function normalizeBranch(branchRef) {
    return branchRef.replace("refs/heads/", "");
}
