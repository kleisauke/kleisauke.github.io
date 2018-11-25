<template>
    <div class="container grid-xl contact">
        <h1 class="caption text-uppercase"><span>{{ $t('menu.contact') }}</span></h1>
        <div class="pt-2 columns">
            <div class="column col-7 col-md-12 map">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('contact.subtitle.location') }}
                    </span>
                </h3>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d38393.16892691919!2d5.6720706!3d53.0280375!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c8f1b7ff39f791%3A0x75235a11696bd87a!2sSneek!5e0!3m2!1snl!2snl!4v1442493564758"
                        allowfullscreen></iframe>
            </div>
            <div class="column col-5 col-md-12">
                <h3>
                    <span class="text-bold bg-dark px-2">
                        {{ $t('contact.subtitle.email') }}
                    </span>
                </h3>
                <form v-if="!submitted" id="contact-form" @submit.prevent="checkForm"
                      action="https://kleisauke.nl/send-mail.php"
                      method="post"
                      novalidate>
                    <div class="form-group"
                         :class="{'has-error': validated && !validName,'has-success': validName}">
                        <label class="form-label text-light text-bold text-uppercase" for="name">{{
                            $t('contact.form.name.title') }}</label>
                        <div class="has-icon-right">
                            <input class="form-input" type="text" id="name" v-model="name"
                                   :placeholder="$t('contact.form.name.label')"
                                   required>
                            <i class="form-icon loading" :class="{'d-none': !loading}"></i>
                        </div>
                        <p v-if="validated && !validName" class="form-input-hint">
                            {{ $t('contact.form.name.error') }}
                        </p>
                    </div>
                    <div class="form-group"
                         :class="{'has-error': validated && !validEmail,'has-success': validEmail}">
                        <label class="form-label text-light text-bold text-uppercase" for="email">{{
                            $t('contact.form.email.title') }}</label>
                        <div class="has-icon-right">
                            <input class="form-input" type="text" id="email" v-model="email"
                                   :placeholder="$t('contact.form.email.label')"
                                   pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required>
                            <i class="form-icon loading" :class="{'d-none': !loading}"></i>
                        </div>
                        <p v-if="validated && !validEmail"
                           class="form-input-hint">
                            {{ $t('contact.form.email.error') }}
                        </p>
                    </div>
                    <div class="form-group"
                         :class="{'has-error': validated && !validMessage,'has-success': validMessage}">
                        <label class="form-label text-light text-bold text-uppercase" for="message">{{
                            $t('contact.form.message.title') }}</label>
                        <div class="has-icon-right">
                            <textarea class="form-input" id="message" v-model="message" rows="3"
                                      :placeholder="$t('contact.form.message.label')" minlength="5" required></textarea>
                            <i class="form-icon loading" :class="{'d-none': !loading}"></i>
                        </div>
                        <p v-if="validated && !validMessage" class="form-input-hint">
                            {{ $t('contact.form.message.error') }}
                        </p>
                    </div>
                    <button class="btn btn-primary" :disabled="loading">{{ $t('contact.form.send-button') }}</button>
                    <vue-recaptcha ref="recaptcha" :sitekey="sitekey" size="invisible" @verify="submit"></vue-recaptcha>
                    <input type="hidden" name="lang" id="lang" :value="$i18n.locale"/>
                </form>
                <div class="empty" v-if="submitted">
                    <div class="empty-icon"><i class="icon icon-3x"
                                               :class="{'icon-check': response.status === 'success', 'icon-cross': response.status === 'error'}"></i>
                    </div>
                    <p class="empty-title h5">{{ response.message }}</p>
                    <p class="empty-subtitle"
                       v-for="(error, index) in response.data"
                       :key="index">
                        {{ error }}
                    </p>
                    <div class="empty-action">
                        <button class="btn btn-primary" @click="submitted = false">
                            {{ $t('contact.form.' + (response.status === 'success' ? 'resend-button' : 'try-again')) }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'

  import axios from 'axios'

  export default {
    name: 'contact',
    components: {
      VueRecaptcha,
    },
    data: () => ({
      url: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit',
      sitekey: '6Lf0CBEUAAAAAKwGVMcNTuyrq02yErXEUmQ1WQz5',
      loaded: false,
      loading: false,
      submitted: false,
      validated: false,
      response: {
        status: 'success',
        data: [],
        message: '',
      },
      name: undefined,
      email: undefined,
      message: undefined,
    }),
    mounted () {
      if (!this.loaded) {
        this.loaded = true
        let script = document.createElement('script')
        script.src = this.url + ('&hl=' + this.$i18n.locale)
        script.async = true

        document.head.appendChild(script)
      }
    },
    computed: {
      validName () {
        return this.name !== undefined && this.name.length > 0
      },
      validEmail () {
        if (this.email === undefined || this.email.length === 0) {
          return false
        }

        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(this.email)
      },
      validMessage () {
        return this.message !== undefined && this.message.length >= 5
      },
    },
    methods: {
      submit (response) {
        this.loading = true
        this.validated = false

        let bodyFormData = new FormData()
        bodyFormData.set('name', this.name)
        bodyFormData.set('email', this.email)
        bodyFormData.set('message', this.message)
        bodyFormData.set('lang', this.$i18n.locale)
        bodyFormData.set('g-recaptcha-response', response)

        axios.post('https://kleisauke.nl/send-mail.php', bodyFormData).then(status => {
          this.loading = false

          this.name = undefined
          this.email = undefined
          this.message = undefined

          this.$refs.recaptcha.reset()
          this.response = status.data

          this.submitted = true
        }).catch(status => {
          this.loading = false

          this.$refs.recaptcha.reset()
          this.response = status.response.data

          this.submitted = true
        })
      },
      checkForm () {
        this.validated = true
        if (this.validName && this.validEmail && this.validMessage) {
          this.$refs.recaptcha.execute()
        }
      },
    },
  }
</script>
