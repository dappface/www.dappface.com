import React from 'react'
import styled from 'styled-components'

import {Color} from '../const'
import {useHasMounted, useDarkMode} from '../hooks'
import sunDarkImage from '../../static/sun-dark.png'
import sunLightImage from '../../static/sun-light.png'
import {IoMdSunny} from 'react-icons/io'

export function Header(): JSX.Element {
  const {isDarkMode, toggleDarkMode} = useDarkMode()
  const hasMounted = useHasMounted()

  return (
    <Container>
      <Logo>DAPPFACE</Logo>
      {hasMounted ? (
        <button onClick={toggleDarkMode} type='button'>
          <IoMdSunny color={isDarkMode ? Color.White : Color.Black} size={28} />
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
  font-size: 24px;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
`

interface DarModeButtonProps {
  image: string
}
