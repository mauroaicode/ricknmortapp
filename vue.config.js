const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: process.env.VUE_APP_BACK_URL,
  },
  transpileDependencies: true
})
