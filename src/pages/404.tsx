import React from 'react'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function(): JSX.Element {
  return (
    <Layout>
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
