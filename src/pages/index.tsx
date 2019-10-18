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
            width='420'
            height='315'
            frameBorder='0'
            src='https://www.youtube.com/embed/89TFedIOfeY?autoplay=1&controls=0'
          />
        </PaddingHorizontal>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PaddingHorizontal = styled.div`
  padding: ${Size.Margin16}px 0;
`

const Player = styled.iframe`
  border-radius: ${Size.BorderRadius}px;
`
