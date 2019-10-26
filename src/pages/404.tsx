import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'

export default function({location}: PageRendererProps): JSX.Element {
  return (
    <Layout location={location}>
      <Container>Page not found</Container>
    </Layout>
  )
}

const Container = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
