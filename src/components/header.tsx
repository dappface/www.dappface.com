import React from 'react'
import styled from 'styled-components'

import {useHasMounted, useToggleDarkMode} from '../hooks'

export function Header(): JSX.Element {
  const toggleDarkMode = useToggleDarkMode()
  const hasMounted = useHasMounted()

  return (
    <Container>
      <Logo>DAPPFACE</Logo>
      {hasMounted ? (
        <button onClick={toggleDarkMode} type='button'>
          button
        </button>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 25px;
`

const Logo = styled.h1`
  font-size: 16px;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
`
