import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function({location}: PageRendererProps): JSX.Element {
  return (
    <Layout location={location}>
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

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
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
