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

      <HeaderNav>
        <HeaderNavList>
          <HeaderNavItem>
            <NavLink to='/contact'>Contact</NavLink>
          </HeaderNavItem>

          <HeaderNavItem>
            <NavLink to='/contact'>Contact</NavLink>
          </HeaderNavItem>

          <HeaderNavItem>
            <NavLink to='/contact'>Contact</NavLink>
          </HeaderNavItem>

          <HeaderNavItem>
            <NavLink to='/contact'>Contact</NavLink>
          </HeaderNavItem>

          <HeaderNavItem>
            <NavLink to='/contact'>Contact</NavLink>
          </HeaderNavItem>
        </HeaderNavList>
      </HeaderNav>
    </Container>
  )
}

const HEADER_HEIGHT = 77
const HEADER_NAV_HEIGHT = 48

const Container = styled.header`
  display: flex;
  flex-direction: column;
  height: ${HEADER_HEIGHT + HEADER_NAV_HEIGHT}px;

  @media only screen and (min-width: 768px) {
    height: ${HEADER_HEIGHT}px;
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
    height: ${HEADER_HEIGHT}px;
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
  height: ${HEADER_HEIGHT}px;
`

const HeaderNav = styled.nav`
  height: ${HEADER_NAV_HEIGHT}px;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`

const HeaderNavList = styled.ul`
  overflow: scroll;
  white-space: nowrap;
`

const HeaderNavItem = styled.li`
  display: inline-block;
  width: 92px;
`

const NavLink = styled(Link)`
  height: ${HEADER_NAV_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`
