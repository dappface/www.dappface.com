import React from 'react'
import styled from 'styled-components'

import {Size} from '../../const'

export function Reference(): JSX.Element {
  return (
    <Container>
      <h4>JSON-RPC Docs</h4>
      <ReferenceList>
        <Item>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/ethereum/wiki/wiki/JSON-RPC'
            aria-label='Go to Ethereum Wiki'>
            Ethereum
          </a>
        </Item>
        <Item>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/ethereum/go-ethereum/wiki/Management-APIs'
            aria-label='Go to Geth Wiki'>
            Geth
          </a>
        </Item>
        <Item>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://wiki.parity.io/jsonrpc'
            aria-label='Go to Parity Wiki'>
            Parity
          </a>
        </Item>
        <Item>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://metamask.github.io/metamask-docs/API_Reference/JSON_RPC_API'
            aria-label='Go to MetaMask Docs'>
            MetaMask
          </a>
        </Item>
      </ReferenceList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ReferenceList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div:not(:last-child) {
    border-right: 1px solid ${({theme}): string => theme.color.medium};
  }
`

const Item = styled.div`
  > a {
    padding: 0 ${Size.Margin16}px;
  }
`
