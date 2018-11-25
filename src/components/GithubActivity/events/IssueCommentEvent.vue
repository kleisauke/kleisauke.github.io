<template>
    <div class="github-event">
        <span class="event-octicon octicon dashboard-event-icon octicon-comment"/>
        <div class="event-text">
            <b>
                Commented on {{ event.payload.issue.pull_request ? 'pull request' : 'issue' }}
                <a :href="event.payload.issue.html_url"
                   class="event-link"
                   target="_blank"> #{{ event.payload.issue.number }}</a>
                at
                <a :href="`https://github.com/${event.repo.name}`"
                   class="event-link"
                   target="_blank">{{ event.repo.name }}</a>
            </b>
        </div>
        <div class="event-time">
            <timeago :datetime="event.created_at" :locale="$i18n.locale"></timeago>
        </div>
        <ul>
            <li class="event-text event-detail">
                <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"/>
                <a :href="event.payload.comment.html_url"
                   class="event-link"
                   target="_blank">See comment here</a>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'IssueCommentEvent',
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style>
</style>
