import React from 'react'
import {graphql, PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {SEO} from '../components/seo'
import {Size} from '../const'

interface Props extends PageRendererProps {
  data: {
    site: {
      siteMetadata: {
        subtitle: string
      }
    }
  }
}

export default function({location, data}: Props): JSX.Element {
  return (
    <Layout location={location}>
      <SEO titleTemplate={`%s - ${data.site.siteMetadata.subtitle}`} />
      <Container>
        <PaddingHorizontal>Hello</PaddingHorizontal>
        <PaddingHorizontal>
          <Player
            title='DAPPFACE demo'
            src='https://www.youtube-nocookie.com/embed/89TFedIOfeY?autoplay=1&controls=0'
            width='420'
            height='315'
            frameBorder='0'
          />
        </PaddingHorizontal>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        subtitle
      }
    }
  }
`

const Container = styled.main`
  align-items: center;
  padding-bottom: 48px;
`

const PaddingHorizontal = styled.div`
  padding: ${Size.Margin16}px 0;
`

const Player = styled.iframe`
  max-width: calc(100vw - ${Size.Margin16 * 2}px);
  border-radius: ${Size.BorderRadius}px;
`
