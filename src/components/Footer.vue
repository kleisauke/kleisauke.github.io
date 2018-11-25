<template>
    <footer>
        <div class="dropdown dropup" id="language-chooser">
            <a :title="$t('footer.language-chooser')" class="btn btn-primary dropdown-toggle" tabindex="0">
                <i class="la la-globe la-lg mr-1"></i><i class="icon icon-caret"></i>
            </a>
            <ul class="menu text-left">
                <li class="menu-item"
                    v-for="lang in supportedLanguages"
                    :key="lang">
                    <router-link @click.native.prevent="changeLanguage(lang)"
                                 :event="''"
                                 :to="localizedLink('about', lang)"
                                 :class="{ 'active': isCurrentLanguage(lang) }"
                                 activeClass=""
                                 exactActiveClass="">
                        <i class='icon flag' :class="[`icon-${lang}`]"></i>
                        {{ $t('language', lang) }}
                    </router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
  import { Trans } from '@/utils/Translation'

  export default {
    name: 'Footer',
    computed: {
      supportedLanguages () {
        return Trans.supportedLanguages
      },
    },
    methods: {
      changeLanguage (lang) {
        const routeParams = this.localizedLink(this.$route.name.split('.').pop(), lang)
        const to = this.$router.resolve(routeParams)
        return Trans.changeLanguage(lang).then(() => {
          this.$router.push(to.location)
        })
      },
      isCurrentLanguage (lang) {
        return lang === this.$i18n.locale
      },
      localizedLink (name, lang) {
        return {name: `${lang}.${name}`, params: this.$router.currentRoute.params}
      },
    },
  }
</script>
