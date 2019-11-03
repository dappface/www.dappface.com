import React from 'react'
import styled from 'styled-components'

import {Size} from '../../const'
import {SandboxProvider, useSandboxContextValue, getMethodIds} from './context'
import {Method} from './method'

export function EthereumSandbox(): JSX.Element {
  const value = useSandboxContextValue()
  const methodIds = getMethodIds(value.state)

  return (
    <SandboxProvider value={value}>
      <Container>
        {methodIds.map(id => (
          <Method key={id} id={id} />
        ))}
        <button type='button' onClick={() => value.addMethod()}>
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
