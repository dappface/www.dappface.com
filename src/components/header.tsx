import React from 'react'
import {Link} from 'gatsby'
import {IoMdSunny, IoLogoGithub, IoLogoTwitter} from 'react-icons/io'
import styled from 'styled-components'

import {Size} from '../const'
import {useHasMounted, useDarkMode} from '../hooks'

export function Header(): JSX.Element {
  const {toggleDarkMode} = useDarkMode()
  const hasMounted = useHasMounted()

  return (
    <Container>
      <Link to='/'>
        <Logo>DAPPFACE</Logo>
      </Link>

      <LinkList>
        <LinkItem>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/dappface'
            aria-label='Go to GitHub Page'>
            <IoLogoGithub size={28} />
          </a>
        </LinkItem>

        <LinkItem>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://twitter.com/dappface_com'
            aria-label='Go to Twitter Page'>
            <IoLogoTwitter size={28} />
          </a>
        </LinkItem>

        <LinkItem>
          {hasMounted ? (
            <button
              onClick={toggleDarkMode}
              type='button'
              aria-label='Dark Mode'>
              <IoMdSunny size={28} />
            </button>
          ) : null}
        </LinkItem>
      </LinkList>
    </Container>
  )
}

const Container = styled.header`
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

const LinkList = styled.ul`
  display: flex;
  align-items: center;
`

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
`
