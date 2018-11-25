<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-star dashboard-event-icon"/>
        <div class="event-text">
            <b>
                Starred
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
  export default {
    name: 'WatchEvent',
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
