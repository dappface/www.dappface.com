import React from 'react'
import {Link} from 'gatsby'
import {IoMdSunny, IoLogoGithub, IoLogoTwitter} from 'react-icons/io'
import styled from 'styled-components'

import {HeaderSize, Size} from '../const'
import {HeaderNav} from './header-nav'
import {useHasMounted, useDarkMode} from '../hooks'

export function Header(): JSX.Element {
  const {toggleDarkMode} = useDarkMode()
  const hasMounted = useHasMounted()

  return (
    <Container>
      <Row>
        <Home>
          <HomeLink to='/'>
            <h1>DAPPFACE</h1>
          </HomeLink>
        </Home>

        <LinkList>
          <LogoLink>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/dappface'
              aria-label='Go to GitHub Page'>
              <IoLogoGithub size={28} />
            </a>
          </LogoLink>

          <LogoLink>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://twitter.com/dappface_com'
              aria-label='Go to Twitter Page'>
              <IoLogoTwitter size={28} />
            </a>
          </LogoLink>

          <LogoLink>
            {hasMounted ? (
              <button
                onClick={toggleDarkMode}
                type='button'
                aria-label='Dark Mode'>
                <IoMdSunny size={28} />
              </button>
            ) : null}
          </LogoLink>
        </LinkList>
      </Row>

      <HeaderNav />
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  flex-direction: column;
  height: ${HeaderSize.Height + HeaderSize.NavHeight}px;

  @media only screen and (min-width: 768px) {
    height: ${HeaderSize.Height}px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const Home = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`

const HomeLink = styled(Link)`
  h1 {
    padding: 0 ${Size.Margin24}px;
    display: flex;
    height: ${HeaderSize.Height}px;
    align-items: center;
    font-size: 24px;
    font-family: 'Roboto Slab', serif;
    font-weight: 300;
  }
`

const LinkList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const LogoLink = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: ${HeaderSize.Height}px;
`
