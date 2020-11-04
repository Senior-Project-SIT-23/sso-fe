const { useBabelRc, override, addPostcssPlugins } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

const postcssPlugins = [require('tailwindcss'), require('autoprefixer')]

if (process.env.NODE_ENV === 'production') {
  postcssPlugins.push(
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.jsx'],
      css: ['./src/style/app.css'],
      whitelist: ['body'],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  )
}

module.exports = override(addPostcssPlugins(postcssPlugins), useBabelRc(), addReactRefresh())
