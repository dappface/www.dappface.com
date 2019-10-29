module.exports = {
  siteMetadata: {
    title: 'DAPPFACE',
    subtitle: 'Open Source Web3 Mobile Browser',
    description:
      'DAPPFACE is an open source crypto news aggregator and a mobile web3.',
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
