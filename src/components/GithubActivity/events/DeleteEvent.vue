<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-trashcan dashboard-event-icon"/>
        <div class="event-text">
            <b>
                Deleted {{ event.payload.ref_type }}
                <a class="event-link"
                   href="#">{{ event.payload.ref }}</a>
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
  export default {
    name: 'DeleteEvent',
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
