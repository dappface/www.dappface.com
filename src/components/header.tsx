import React from 'react'
import styled from 'styled-components'

import {Size} from '../const'
import {useHasMounted, useDarkMode} from '../hooks'
import {IoMdSunny, IoLogoGithub, IoLogoTwitter} from 'react-icons/io'

export function Header(): JSX.Element {
  const {toggleDarkMode} = useDarkMode()
  const hasMounted = useHasMounted()

  return (
    <Container>
      <Logo>DAPPFACE</Logo>

      <LinkList>
        <LinkItem>
          <a href='https://github.com/dappface' target='_blank'>
            <IoLogoGithub size={28} />
          </a>
        </LinkItem>

        <LinkItem>
          <a href='https://twitter.com/dappface_com' target='_blank'>
            <IoLogoTwitter size={28} />
          </a>
        </LinkItem>

        {hasMounted ? (
          <LinkItem>
            <button onClick={toggleDarkMode} type='button'>
              <IoMdSunny size={28} />
            </button>
          </LinkItem>
        ) : null}
      </LinkList>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  padding: 0 ${Size.Margin24}px;
`

const Logo = styled.h1`
  font-size: 24px;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
`

const LinkList = styled.div`
  display: flex;
  align-items: center;
`

const LinkItem = styled.div`
  padding: 0 ${Size.Margin16}px;
`
