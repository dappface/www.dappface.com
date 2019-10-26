import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'

import {HeaderSize} from '../const'

export function HeaderNav(): JSX.Element {
  return (
    <Container>
      <NavList>
        <NavItem>
          <NavLink to='/contact'>Contact</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to='/contact'>Contact</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to='/contact'>Contact</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to='/contact'>Contact</NavLink>
        </NavItem>

        <NavItem>
          <NavLink to='/contact'>Contact</NavLink>
        </NavItem>
      </NavList>
    </Container>
  )
}

const Container = styled.nav`
  height: ${HeaderSize.NavHeight}px;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`

const NavList = styled.ul`
  overflow: scroll;
  white-space: nowrap;
`

const NavItem = styled.li`
  display: inline-block;
  width: 92px;
`

const NavLink = styled(Link)`
  height: ${HeaderSize.NavHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`
