import axios from 'axios'
import i18n from '@/i18n'

const Trans = {
  get defaultLanguage () {
    return process.env.VUE_APP_I18N_LOCALE || 'nl'
  },

  get supportedLanguages () {
    return Object.keys(i18n.messages)
  },

  /**
   * Sets the language to various services (axios, the html tag etc)
   * @param {String} lang
   * @return {String} lang
   */
  setI18nLanguageInServices (lang) {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    document.querySelector('meta[name=\'description\']').
      setAttribute('content', i18n.t('meta.description'))

    return lang
  },

  /**
   * Loads new translation messages and changes the language when finished
   * @param lang
   * @return {Promise<any>}
   */
  changeLanguage (lang) {
    if (!Trans.isLangSupported(lang)) {
      return Promise.reject(new Error('Language not supported'))
    }

    if (i18n.locale === lang) {
      // Has been loaded prior
      return Promise.resolve(lang)
    }

    return Promise.resolve(Trans.setI18nLanguageInServices(lang))
  },

  /**
   * Checks if a lang is supported
   * @param {String} lang
   * @return {boolean}
   */
  isLangSupported (lang) {
    return Trans.supportedLanguages.includes(lang)
  },

  /**
   * Checks if the route's param is supported, if not, redirects to the first supported one.
   * @param {Route} to
   * @param {Route} from
   * @param {Function} next
   * @return {*}
   */
  routeMiddleware (to, from, next) {
    const lang = to.name.split('.').shift()

    return Trans.changeLanguage(lang).then(() => next())
  },
}

export { Trans }
