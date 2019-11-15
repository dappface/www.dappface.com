import React from 'react'
import styled from 'styled-components'

import {Size} from '../../const'

export function NoProvider(): JSX.Element {
  return (
    <Container>
      <div>
        Looks like there is no Ethereum provider injected. To learn more, check
        out the EIP1193 specification{' '}
        <DocLink
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md'
          aria-label='Go to EIP1193 Page'>
          here
        </DocLink>
        .
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 ${Size.Margin16}px;
`

const DocLink = styled.a`
  text-decoration: underline;
`
