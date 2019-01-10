<template>
    <div class="github-event">
        <span :class="event.payload.action === 'opened' ? 'octicon-issue-opened' : 'octicon-issue-closed'"
              class="event-octicon octicon dashboard-event-icon"/>
        <div class="event-text">
            <b>
                {{ event.payload.action | capitalize }} issue
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
                {{ event.payload.issue.title }}
            </li>
        </ul>
    </div>
</template>

<script>
  import { capitalize } from '../utils/Filters'

  export default {
    name: 'IssuesEvent',
    filters: {
      capitalize,
    },
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
