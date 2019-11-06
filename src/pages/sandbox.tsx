import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {EthereumSandbox, NoProvider} from '../components/sandbox'
import {SEO} from '../components/seo'
import {Size} from '../const'
import {EthereumProvider, useInitEthereum} from '../hooks'

export default function({location}: PageRendererProps): JSX.Element {
  const ethereum = useInitEthereum()
  return (
    <Layout location={location}>
      <SEO
        title='Ethereum Sandbox'
        description='A place to easily play around with Ethereum JSON-RPC. This is a good place to test your EIP-1193 compatible ethereum provider and its connected remote node.'
      />
      <Container>
        <Header>Ethereum Sandbox</Header>
        {window.ethereum && (
          <>
            <div>window.ethereum Properties</div>
            <pre>{JSON.stringify(Object.keys(window.ethereum), null, 2)}</pre>
          </>
        )}
        {window.web3 && window.web3.currentProvider && (
          <>
            <div>window.web3.currentProvider Properties</div>
            <pre>
              {JSON.stringify(
                Object.keys(window.web3.currentProvider),
                null,
                2,
              )}
            </pre>
          </>
        )}

        {/* <EthereumProvider value={ethereum}>
          <PlaygroudContainer>
            {typeof ethereum !== 'undefined' ? (
              <EthereumSandbox />
            ) : (
              <NoProvider />
            )}
          </PlaygroudContainer>
        </EthereumProvider> */}
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
