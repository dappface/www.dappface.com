module.exports = {
  siteMetadata: {
    title: 'DAPPFACE',
    description: 'Open Source Web3 Mobile Browser',
    image: 'static/icon-512x512.png',
    url: 'https://www.dappface.com',
    twitter: {
      username: '@dappface_com',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {isTSX: true, allExtensions: true},
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
  ],
}
