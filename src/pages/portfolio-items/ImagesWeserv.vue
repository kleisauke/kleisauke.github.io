<template>
    <div class="modal-container" role="document">
        <div class="modal-header">
            <a class="btn btn-clear float-right" href="#" aria-label="Close" @click.prevent="$emit('onClose')"></a>
            <h1 class="modal-title caption text-uppercase"><span>images.weserv.nl</span></h1>
        </div>
        <div class="modal-body">
            <div class="content columns">
                <div class="column col-6">
                    <img src="../../assets/images/portfolio-big/portfolio-big-03.jpg"
                         alt="images.weserv.nl"
                         class="img-responsive s-rounded mb-2">
                </div>
                <div class="column col-6 col-sm-12">
                    <div v-for="(info, index) in $t('portfolio.items.images-weserv.info')"
                         :key="index">
                        <h3><span class="text-bold bg-dark px-2">{{ info.title }}</span></h3>
                        <p v-for="(paragraph, pindex) in info.paragraphs"
                           :key="pindex"
                           v-html="paragraph">
                        </p>
                    </div>
                    <h3><span class="text-bold bg-dark px-2">{{ $t('portfolio.technology') }}</span></h3>
                    <a :href="$t('portfolio.urls.linux')"><span class="chip">Linux</span></a>
                    <a href="http://nginx.org/"><span class="chip">nginx</span></a>
                    <a href="https://libvips.github.io/libvips/"><span class="chip">libvips</span></a>
                    <a href="https://openresty.org/en/"><span class="chip">OpenResty</span></a>
                    <a href="https://redis.io/"><span class="chip">Redis</span></a>
                    <a href="https://www.opendns.com/"><span class="chip">OpenDNS</span></a>
                    <a href="https://www.cloudflare.com/"><span class="chip">CloudFlare</span></a>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btn-group">
                <a href="https://images.weserv.nl" class="btn btn-primary">{{ $t('portfolio.visit-website') }}</a>
                <a href="https://github.com/weserv/images" class="btn btn-primary">{{ $t('portfolio.view-sourcecode') }}</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'images-weserv',
  }
</script>
