const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const ScriptExtWebpackPlugin = require('script-ext-html-webpack-plugin')

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    outputDir: path.join(__dirname, 'dist', process.env.PUBLIC_PATH),
    indexPath: path.join(__dirname, 'dist', process.env.PUBLIC_PATH, 'index.html'),
    routes: [
      '/',
      '/in-het-kort',
      '/portfolio',
      '/contact',
      '/en',
      '/en/resume',
      '/en/portfolio',
      '/en/contact',
      '/portfolio/net-vips',
      '/portfolio/images-weserv',
      '/portfolio/rocrooster-web',
      '/portfolio/rocrooster-app',
      '/en/portfolio/net-vips',
      '/en/portfolio/images-weserv',
      '/en/portfolio/rocrooster-web',
      '/en/portfolio/rocrooster-app',
    ],
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
    },
  }),
]

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  outputDir: path.join(__dirname, 'dist', process.env.PUBLIC_PATH),
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins)
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('script-ext').use(ScriptExtWebpackPlugin, [
        {
          sync: /app\..*\.js/, // don't add the defer attribute here
          defaultAttribute: 'defer',
        }]).after('html')
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'nl',
      fallbackLocale: 'nl',
    },
  },
}
