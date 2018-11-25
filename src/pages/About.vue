<template>
    <div class="container grid-xl about">
        <h1 class="caption text-uppercase"><span>{{ $t('menu.about') }}</span></h1>
        <div class="pt-2 columns">
            <div class="column col-2 col-sm-3 profile-image">
                <img src="../assets/images/about/profile-1.jpg" @click="nextProfilePicture"
                     class="img-responsive s-rounded active" :alt="$t('about.meta.picture')">
            </div>
            <div class="column col-4 col-sm-9">
                <h2 class="h4 text-bold">
                    {{ $t('about.caption.prefix') }} <span class="label label-primary">{{ $t('about.caption.highlight') }} </span>
                </h2>
                <p class="h6 text-normal">{{ $t('about.info') }}</p>
            </div>
            <div class="column col-ml-auto col-4 col-sm-12">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('about.subtitle.personal-info') }}
                    </span>
                </h3>
                <table class="table">
                    <tbody>
                    <tr>
                        <td><i class="la la-envelope la-lg"></i></td>
                        <td><a href="mailto:info@kleisauke.nl">info@kleisauke.nl</a></td>
                    </tr>
                    <tr>
                        <td><i class="la la-phone la-lg"></i></td>
                        <td>+31 (0)6 1226 7733</td>
                    </tr>
                    <tr>
                        <td><i class="la la-info-circle la-lg"></i></td>
                        <td><a href="/vCard.vcf">{{ $t('about.vcard') }}</a></td>
                    </tr>
                    <tr>
                        <td><i class="la la-github la-lg"></i></td>
                        <td><a href="https://github.com/kleisauke">GitHub</a></td>
                    </tr>
                    <tr>
                        <td><i class="la la-linkedin la-lg"></i></td>
                        <td><a href="https://www.linkedin.com/in/kleisauke/">LinkedIn</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="column col-6 col-lg-8 col-md-12">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('about.subtitle.github-activity') }}
                    </span>
                </h3>
                <GithubFeed/>
            </div>
        </div>
    </div>
</template>

<script>
  import GithubFeed from '@/components/GithubActivity/GithubFeed.vue'

  export default {
    name: 'about',
    components: {
      GithubFeed,
    },
    data: () => ({
      images: [
        require('../assets/images/about/profile-1.jpg'),
        require('../assets/images/about/profile-2.jpg'),
      ],
      i: 0,
    }),
    methods: {
      nextProfilePicture (event) {
        this.i++
        this.i %= this.images.length
        event.target.src = this.images[this.i]
      },
    },

  }
</script>
