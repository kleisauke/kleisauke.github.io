<template>
    <div class="feed">
        <div class="events-wrapper">
            <div class="feed-list">
                <div class="event-list">
                    <div v-for="event in validEvents"
                         :key="event.id">
                        <component :is="event.type" :event="event"></component>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-wrapper">
            <span class="octicon octicon-rss"/>&nbsp;
            <a href="https://github.com/kleisauke" target="_blank">{{ $t('about.more-activity') }}</a>
        </div>
    </div>
</template>

<script>
  import PushEvent from './events/PushEvent.vue'
  import PullRequestEvent from './events/PullRequestEvent.vue'
  import CreateEvent from './events/CreateEvent.vue'
  import WatchEvent from './events/WatchEvent.vue'
  import DeleteEvent from './events/DeleteEvent.vue'
  import IssuesEvent from './events/IssuesEvent.vue'
  import IssueCommentEvent from './events/IssueCommentEvent.vue'
  import ForkEvent from './events/ForkEvent.vue'
  import CommitCommentEvent from './events/CommitCommentEvent.vue'
  import PublicEvent from './events/PublicEvent.vue'
  import PullRequestReviewCommentEvent from './events/PullRequestReviewCommentEvent.vue'

  import axios from 'axios'

  export default {
    name: 'GithubFeed',
    components: {
      PushEvent,
      PullRequestEvent,
      CreateEvent,
      WatchEvent,
      DeleteEvent,
      IssuesEvent,
      IssueCommentEvent,
      ForkEvent,
      CommitCommentEvent,
      PublicEvent,
      PullRequestReviewCommentEvent
    },
    data: () => ({
      events: [],
      maxItems: 5,
      loading: false,
      error: false,
    }),
    computed: {
      validEvents () {
        return this.events.filter((event) => {
          return this.isValidType(event.type)
        })
      },
    },
    mounted () {
      axios.get('https://api.github.com/users/kleisauke/events').then(events => {
        this.loading = false
        this.error = false
        this.events = events.data.slice(0, this.maxItems)
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    },
    methods: {
      isValidType (type) {
        return Object.keys(this.$options.components).includes(type)
      },
    },
  }
</script>

<style lang="scss">
    .feed {
        position: relative;
        display: table;
        width: 100%;
        font-size: 1rem;
        background-color: rgba(255, 255, 255, 0.6);
        .events-wrapper {
            height: 100%;
            display: table-row;
            .feed-list {
                overflow-y: auto;
                position: relative;
                display: table-cell;
                .event-list {
                    width: 100%;
                }
            }
        }
        .footer-wrapper {
            padding: 0.6rem;
            font-weight: bold;
            font-size: 0.7rem;
        }
    }

    .github-event {
        border-top: 1px solid #f1f1f1;
        padding-left: 1rem;
        .event-octicon {
            color: #bbb;
            margin-right: 0.4rem;
        }
        ul {
            margin: 0 1.2rem 0.8rem;
        }
        .event-text {
            display: inline-block;
            font-size: 0.7rem;
        }
        .event-time {
            display: inline-block;
            font-size: 0.6rem;
            margin-left: 0.2rem;
            color: #bbb;
        }
        .event-detail {
            list-style: none;
            color: #666666;
        }
    }

    .github-octicon {
        font: normal normal 40px 'octicons';
    }
</style>
