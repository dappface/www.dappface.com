import React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

interface Props {
  lang?: string
  title?: string
  titleTemplate?: string
}

export function SEO({
  lang = 'en',
  title: titleProp,
  titleTemplate = '%s - DAPPFACE',
}: Props): JSX.Element {
  const {
    site: {siteMetadata},
  } = useStaticQuery(query)

  const title = titleProp || siteMetadata.title

  return (
    <Helmet titleTemplate={titleTemplate}>
      <html lang={lang} />
      <title>{title}</title>
      <meta name='description' content={siteMetadata.description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={siteMetadata.description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={siteMetadata.url} />
      <meta property='og:site_name' content={title} />
      <meta name='og:image' content={siteMetadata.image} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content={siteMetadata.twitter.username} />
      <meta name='twitter:site' content={siteMetadata.twitter.username} />
      <meta name='twitter:title' content={title} />
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
