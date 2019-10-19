import React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

interface Props {
  lang?: string
}

export function SEO({lang = 'en'}: Props): JSX.Element {
  const {
    site: {siteMetadata},
  } = useStaticQuery(query)

  return (
    <Helmet titleTemplate='%s - The Mobile Web3 Browser'>
      <html lang={lang} />
      <title>{siteMetadata.title}</title>
      <meta name='description' content={siteMetadata.description} />
      <meta property='og:title' content={siteMetadata.title} />
      <meta property='og:description' content={siteMetadata.description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={siteMetadata.url} />
      <meta property='og:site_name' content={siteMetadata.title} />
      <meta name='og:image' content={siteMetadata.image} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content={siteMetadata.twitter.username} />
      <meta name='twitter:site' content={siteMetadata.twitter.username} />
      <meta name='twitter:title' content={siteMetadata.title} />
      <meta name='twitter:description' content={siteMetadata.description} />
      <meta name='twitter:image' content={siteMetadata.image} />
    </Helmet>
  )
}

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        image
        url
        twitter {
          username
        }
      }
    }
  }
`
