<template>
    <div class="github-event">
        <span :class="event.payload.ref_type === 'repository' ? 'octicon-repo' : 'octicon-git-branch'"
              class="event-octicon octicon dashboard-event-icon"/>
        <div class="event-text">
            <b>
                Created {{ event.payload.ref_type }}
                <span v-if="event.payload.ref_type !== 'repository'">
                  <a :href="link(event)"
                     class="event-link"
                     target="_blank">{{ event.payload.ref }}</a>
                  at
                </span>
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
    name: 'CreateEvent',
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
    methods: {
      link (event) {
        let typeUrl = event.payload.ref_type === 'branch' ? '/tree/' : '/releases/tag/';
        return `https://github.com/${event.repo.name}${typeUrl}${event.payload.ref}`
      },
    },
  }
</script>

<style>
</style>
