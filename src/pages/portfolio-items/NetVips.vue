<template>
    <div class="modal-container" role="document">
        <div class="modal-header">
            <a class="btn btn-clear float-right" href="#" aria-label="Close" @click.prevent="$emit('onClose')"></a>
            <h1 class="modal-title caption text-uppercase"><span>NetVips</span></h1>
        </div>
        <div class="modal-body">
            <div class="content columns">
                <div class="column col-6">
                    <img src="../../assets/images/portfolio-big/portfolio-big-04.jpg"
                         alt="NetVips"
                         class="img-responsive s-rounded mb-2">
                </div>
                <div class="column col-6 col-sm-12">
                    <div v-for="(info, index) in $t('portfolio.items.net-vips.info')"
                         :key="index">
                        <h3><span class="text-bold bg-dark px-2">{{ info.title }}</span></h3>
                        <p v-for="(paragraph, pindex) in info.paragraphs"
                           :key="pindex"
                           v-html="paragraph">
                        </p>
                    </div>
                    <h3><span class="text-bold bg-dark px-2">{{ $t('portfolio.technology') }}</span></h3>
                    <a href="https://en.wikipedia.org/wiki/Platform_Invocation_Services"><span class="chip">P/Invoke</span></a>
                    <a :href="$t('portfolio.urls.net')"><span class="chip">.NET</span></a>
                    <a href="https://libvips.github.io/libvips/"><span class="chip">libvips</span></a>
                    <a href="https://www.nuget.org/"><span class="chip">NuGet</span></a>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="btn-group">
                <a href="https://kleisauke.github.io/net-vips/" class="btn btn-primary">{{ $t('portfolio.view-documentation') }}</a>
                <a href="https://github.com/kleisauke/net-vips" class="btn btn-primary">{{ $t('portfolio.view-sourcecode')}}</a>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'net-vips',
  }
</script>
