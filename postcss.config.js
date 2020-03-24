module.exports = {
  parser: 'postcss-less',
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 100 version', 'ie > 8']
    })
  ]
}
