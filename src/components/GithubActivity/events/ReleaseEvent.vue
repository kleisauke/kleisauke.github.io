<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-rocket dashboard-event-icon"/>
        <div class="event-text">
            <b>
                {{ event.payload.action | capitalize }}
                <a :href="event.payload.release.html_url"
                   class="event-link"
                   target="_blank">{{ event.payload.release.name }}</a>
                at
                <a :href="`https://github.com/${event.repo.name}`"
                   class="event-link"
                   target="_blank">{{ event.repo.name }}</a>
            </b>
        </div>
        <div class="event-time">
            <timeago :datetime="event.created_at" :locale="$i18n.locale"></timeago>
        </div>
    </div>
</template>

<script>
  import { capitalize } from '../utils/Filters'

  export default {
    name: 'ReleaseEvent',
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
