import React from 'react'
import styled from 'styled-components'

import {Size} from '../../const'
import {
  SandboxProvider,
  useSandboxContextValue,
  getMethodIds,
} from '../../hooks'
import {Method} from './method'
import {Reference} from './reference'
import {ChainInfo} from './chain-info'

export function EthereumSandbox(): JSX.Element {
  const value = useSandboxContextValue()
  const methodIds = getMethodIds(value.state)

  return (
    <SandboxProvider value={value}>
      <Container>
        <ChainInfo />
        <Reference />

        {methodIds.map(
          (id): JSX.Element => (
            <Method key={id} id={id} />
          ),
        )}

        <button
          type='button'
          onClick={(): void => {
            value.addMethod()
          }}>
          + Method
        </button>
      </Container>
    </SandboxProvider>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 0 ${Size.Margin16}px;
`
