<template>
    <header class="navbar container grid-xl">
        <div class="off-canvas columns">
            <a class="off-canvas-toggle show-md btn btn-primary btn-action" href="#sidebar"><i
                    class="icon icon-menu"></i></a>

            <ul class="menu off-canvas-sidebar" id="sidebar">
                <li class="menu-item">
                    <router-link activeClass=""
                                 exactActiveClass="active"
                                 :to="localizedLink('about')" class="nav-link">
                        <span>{{ $t('menu.about') }}</span>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link activeClass="active"
                                 exactActiveClass=""
                                 :to="localizedLink('resume')" class="nav-link">
                        <span>{{ $t('menu.resume') }}</span>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link activeClass="active"
                                 exactActiveClass=""
                                 :to="localizedLink('portfolio')" class="nav-link">
                        <span>{{ $t('menu.portfolio') }}</span>
                    </router-link>
                </li>
                <li class="menu-item">
                    <router-link
                            activeClass="active"
                            exactActiveClass=""
                            :to="localizedLink('contact')" class="nav-link">
                        <span>{{ $t('menu.contact') }}</span>
                    </router-link>
                </li>
            </ul>
            <div class="navbar-brand column col-4 col-md-10">
                <div class="title h4">{{ $t('author.name') }}</div>
                <div class="subtitle">{{ $t('author.caption') }}</div>
            </div>
            <a class="off-canvas-overlay" href="#"></a>
        </div>
    </header>
</template>

<script>
  export default {
    name: 'Header',

    methods: {
      localizedLink (name) {
        return {name: `${this.$i18n.locale}.${name}`}
      },
    },
  }
</script>
