<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-radio-tower dashboard-event-icon"/>
        <div class="event-text">
            <a>{{ event.actor.login }}</a>
            <b>
                Open sourced
                <a :href="`https://github.com/${event.repo.name}`"
                   class="event-link"
                   target="_blank">{{ event.repo.name }}
                </a>
            </b>
        </div>
        <div class="event-time">
            <timeago :datetime="event.created_at" :locale="$i18n.locale"></timeago>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'PublicEvent',
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
