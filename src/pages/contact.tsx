import React from 'react'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function() {
  return (
    <Layout>
      <Container>
        <PaddingHorizontal>Contact</PaddingHorizontal>
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const PaddingHorizontal = styled.div`
  padding: ${Size.Margin16}px 0;
`
