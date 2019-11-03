import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {EthereumSandbox} from '../components/sandbox'
import {SEO} from '../components/seo'
import {Size} from '../const'

export default function({location}: PageRendererProps): JSX.Element {
  return (
    <Layout location={location}>
      <SEO
        title='Ethereum Sandbox'
        description='A place to easily play around with Ethereum JSON-RPC. This is a good place to test your provider and connected remote node.'
        // description='A sandbox page to interact with an injected Ethereum provider and its connected remote node.'
      />
      <Container>
        <Header>Ethereum Sandbox</Header>

        <PlaygroudContainer>
          <EthereumSandbox />
        </PlaygroudContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  align-items: center;
`

const Header = styled.h2`
  max-width: 800px;
  width: 100vw
  padding: ${Size.Margin16}px;
  color: ${({theme}): string => theme.color.high};
`

const PlaygroudContainer = styled.div`
  max-width: 800px;
  width: 100vw;
  display: flex;
  flex: 1;
  flex-direction: column;
`
