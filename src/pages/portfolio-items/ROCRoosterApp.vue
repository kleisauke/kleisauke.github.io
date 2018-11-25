<template>
    <div class="modal-container" role="document">
        <div class="modal-header">
            <a class="btn btn-clear float-right" href="#" aria-label="Close" @click.prevent="$emit('onClose')"></a>
            <h1 class="modal-title caption text-uppercase"><span>ROC Rooster App</span></h1>
        </div>
        <div class="modal-body">
            <div class="content columns">
                <div class="column col-6">
                    <img src="../../assets/images/portfolio-big/portfolio-big-01.jpg"
                         alt="ROC Rooster App"
                         class="img-responsive s-rounded mb-2">
                </div>
                <div class="column col-6 col-sm-12">
                    <div v-for="(info, index) in $t('portfolio.items.rocrooster-app.info')"
                         :key="index">
                        <h3><span class="text-bold bg-dark px-2">{{ info.title }}</span></h3>
                        <p v-for="(paragraph, pindex) in info.paragraphs"
                           :key="pindex"
                           v-html="paragraph">
                        </p>
                    </div>
                    <h3><span class="text-bold bg-dark px-2">{{ $t('portfolio.technology') }}</span></h3>
                    <a :href="$t('portfolio.urls.java')"><span class="chip">Java</span></a>
                    <a href="https://developer.android.com/sdk/index.html"><span class="chip">Android SDK</span></a>
                    <a href="https://github.com/ReactiveX/RxJava"><span class="chip">RxJava</span></a>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="https://play.google.com/store/apps/details?id=nl.kleisauke.rocrooster" class="btn btn-primary">{{ $t('portfolio.download-app') }}</a>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'rocrooster-app',
  }
</script>
