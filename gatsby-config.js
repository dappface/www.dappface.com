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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'DAPPFACE',
        /* eslint-disable @typescript-eslint/camelcase */
        short_name: 'DAPPFACE',
        start_url: `/`,
        background_color: '#000',
        theme_color: '#fff',
        /* eslint-enable @typescript-eslint/camelcase */
        display: 'standalone',
        icon: 'static/icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
}
