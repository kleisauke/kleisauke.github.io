<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-repo-forked dashboard-event-icon"/>
        <div class="event-text">
            <b>
                Forked
                <a :href="`https://github.com/${event.repo.name}`"
                   class="event-link"
                   target="_blank">{{ event.repo.name }}</a>
                to
                <a :href="event.payload.forkee.html_url"
                   class="event-link"
                   target="_blank">{{ event.payload.forkee.full_name }}</a>
            </b>
        </div>
        <div class="event-time">
            <timeago :datetime="event.created_at" :locale="$i18n.locale"></timeago>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ForkEvent',
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
