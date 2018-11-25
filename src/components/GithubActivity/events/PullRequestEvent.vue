<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-git-pull-request dashboard-event-icon"/>
        <div class="event-text">
            <b>
                {{ event.payload.action | capitalize }} pull request
                <a :href="event.payload.pull_request.html_url"
                   class="event-link"
                   target="_blank"> #{{ event.payload.number }}</a>
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
                <b v-if="event.payload.pull_request.merged">[MERGED]</b> {{ event.payload.pull_request.title }}
            </li>
        </ul>
    </div>
</template>

<script>
  import { capitalize } from '../utils/Filters'

  export default {
    name: 'PullRequestEvent',
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
