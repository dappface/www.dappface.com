module.exports = {
  siteMetadata: {
    title: 'DAPPFACE',
    siteUrl: `https://www.dappface.com`,
    description: 'Open Source Web3 Mobile Browser',
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
        icons: [
          {
            src: 'static/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'static/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'static/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'static/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'static/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'static/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'static/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'static/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
}
