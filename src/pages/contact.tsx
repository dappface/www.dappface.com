import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function({location}: PageRendererProps) {
  return (
    <Layout location={location}>
      <Container>
        <PaddingHorizontal>Contact</PaddingHorizontal>
      </Container>
    </Layout>
  )
}

const Container = styled.main``

const PaddingHorizontal = styled.div`
  padding: ${Size.Margin16}px 0;
  color: ${({theme}) => theme.color.high};
`
