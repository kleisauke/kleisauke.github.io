<template>
    <div class="container grid-xl portfolio">
        <h1 class="caption text-uppercase"><span>{{ $t('menu.portfolio') }}</span></h1>
        <ul id="filter" class="pt-2 tab">
            <li class="tab-item active">
                <a href="#" data-filter="*" @click.prevent="filter">{{ $t('portfolio.filter.all') }}</a>
            </li>
            <li class="tab-item">
                <a href="#" data-filter=".app" @click.prevent="filter">app</a>
            </li>
            <li class="tab-item">
                <a href="#" data-filter=".website" @click.prevent="filter">website</a>
            </li>
            <li class="tab-item">
                <a href="#" data-filter=".library" @click.prevent="filter">{{ $t('portfolio.filter.library') }}</a>
            </li>
        </ul>
        <div id="portfolio-items" ref="portfolio" class="pt-2 columns">
            <div v-for="item in items"
                 class="item column col-3 col-md-4 col-sm-6 col-xs-12 mb-3"
                 :key="item.name"
                 :class="item.type">
                <div class="card">
                    <div class="card-image">
                        <img @load="onLoaded" :src="item.image" class="img-responsive" :alt="item.name">
                        <router-link class="card-img-overlay text-uppercase"
                                     :to="portfolioItem(item)"
                                     @click.native="openModal(item.id)">
                            <span>{{ $t('portfolio.details') }}</span>
                        </router-link>
                    </div>
                    <div class="card-header">
                        <div class="card-title text-center h5">{{ item.name }}</div>
                        <div class="card-subtitle text-center text-gray">{{ $t('portfolio.type.' + item.type) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal modal-lg active" :id="id" v-if="isValid">
            <a class="modal-overlay" href="#" @click="closeModal" aria-label="Close"></a>
            <component :is="id" @onClose="closeModal"></component>
        </div>
    </div>
</template>

<script>
  import Isotope from 'isotope-layout'

  import ImagesWeserv from '@/pages/portfolio-items/ImagesWeserv.vue'
  import NetVips from '@/pages/portfolio-items/NetVips.vue'
  import RocroosterApp from '@/pages/portfolio-items/ROCRoosterApp.vue'
  import RocroosterWeb from '@/pages/portfolio-items/ROCRoosterWeb.vue'

  export default {
    name: 'portfolio',
    components: {
      ImagesWeserv,
      NetVips,
      RocroosterApp,
      RocroosterWeb,
    },
    data: () => ({
      iso: null,
      items: [
        {
          type: 'library',
          name: 'NetVips',
          image: require('../assets/images/portfolio/portfolio-04.jpg'),
          id: 'net-vips',
        },
        {
          type: 'website',
          name: 'images.weserv.nl',
          image: require('../assets/images/portfolio/portfolio-03.jpg'),
          id: 'images-weserv',
        },
        {
          type: 'website',
          name: 'ROC Rooster Website',
          image: require('../assets/images/portfolio/portfolio-02.jpg'),
          id: 'rocrooster-web',
        },
        {
          type: 'app',
          name: 'ROC Rooster App',
          image: require('../assets/images/portfolio/portfolio-01.jpg'),
          id: 'rocrooster-app',
        },
      ],
      id: null,
      validIds: ['net-vips', 'images-weserv', 'rocrooster-web', 'rocrooster-app'],
    }),
    mounted () {
      this.iso = new Isotope(this.$refs.portfolio, {
        itemSelector: '.item',
        layoutMode: 'masonry',
      })
      this.id = this.$route.params.id
    },
    computed: {
      isValid () {
        return this.validIds.includes(this.id)
      },
    },
    methods: {
      onLoaded () {
        this.iso.layout()
      },
      filter (event) {
        document.querySelectorAll('.tab-item').forEach((elem) => {
          elem.classList.remove('active')
        })
        event.target.parentNode.classList.add('active')

        const selector = event.target.getAttribute('data-filter')
        this.iso.arrange({filter: selector})
      },
      portfolioItem (item) {
        return {name: `${this.$i18n.locale}.portfolio`, params: {id: item.id}}
      },
      openModal (id) {
        this.id = id
      },
      closeModal () {
        this.id = null
        this.$router.replace({name: `${this.$i18n.locale}.portfolio`})
      },
    },
  }
</script>
