<template>
    <div id="app" data-server-rendered="true">
        <Header/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer,
    },
  }
</script>

<style lang="scss">
    // Overrides
    $primary-color: #3085EE;
    $link-color-dark: #3085EE;
    $link-color-light: #3085EE;

    @import '~spectre.css/src/spectre.scss';
    @import '~spectre.css/src/spectre-exp.scss';
    @import '~spectre.css/src/spectre-icons.scss';

    @import 'assets/scss/theme.scss';
    @import '~line-awesome/dist/css/line-awesome.css';
</style>
