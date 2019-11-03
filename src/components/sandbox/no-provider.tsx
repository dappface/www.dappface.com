import React from 'react'
import styled from 'styled-components'

export function NoProvier(): JSX.Element {
  return (
    <Container>
      <div>Looks like there is no Ethereum provider injected.</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
