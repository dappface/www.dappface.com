import React from 'react'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function(): JSX.Element {
  return (
    <Layout>
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
  border-radius: ${Size.BorderRadius}px;
`
