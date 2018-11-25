<template>
    <div class="github-event">
        <span class="event-octicon octicon octicon-repo-push dashboard-event-icon"/>
        <div class="event-text">
            <b>
                Pushed to
                <a :href="branchUri"
                   class="event-link"
                   target="_blank">{{ event.payload.ref | branch }}</a>
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
            <li v-for="commit in event.payload.commits"
                :key="commit.sha"
                class="event-text event-detail">
                <span class="event-octicon octicon octicon-git-commit dashboard-event-icon"/>
                <a :href="`https://github.com/${event.repo.name}/commit/${commit.sha}`"
                   target="_blank"
                   class="event-link">{{ commit.sha | hash }}</a> {{ commit.message | commitTitle }}
            </li>
        </ul>
    </div>
</template>

<script>
  import { hash, branch, commitTitle } from '../utils/Filters'

  export default {
    name: 'PushEvent',
    filters: {
      hash,
      branch,
      commitTitle,
    },
    props: {
      event: {
        type: Object,
        required: true,
      },
    },
    computed: {
      branchUri () {
        return `https://github.com/${this.event.repo.name}/tree/${branch(this.event.payload.ref)}`
      },
    },
  }
</script>

<style>
</style>
