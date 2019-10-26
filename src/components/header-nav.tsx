import React from 'react'
import {Link, PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {HeaderSize, Size} from '../const'

const HEADER_NAV_LINKS = [
  {
    name: 'Contact',
    path: '/contact',
  },
]

interface Props {
  location: PageRendererProps['location']
}

export function HeaderNav({location}: Props): JSX.Element {
  return (
    <Container>
      <NavList>
        {HEADER_NAV_LINKS.map(({name, path}) => (
          <NavItem key={path} isCurrentPage={location.pathname === path}>
            <NavLink to={path}>{name}</NavLink>
          </NavItem>
        ))}
      </NavList>
    </Container>
  )
}

const Container = styled.nav`
  height: ${HeaderSize.NavHeight}px;
`

const NavList = styled.ul`
  overflow: scroll;
  white-space: nowrap;
`

interface NavItemProps {
  isCurrentPage: boolean
}

const NavItem = styled.li<NavItemProps>`
  display: inline-block;
  width: 92px;
  color: ${({theme}): string => theme.color.medium};

  ${({isCurrentPage, theme}) =>
    isCurrentPage &&
    `
    color: ${theme.color.high};
  `}

  @media only screen and (min-width: 768px) {
    width: auto;
    padding: 0 ${Size.Margin16}px;
  }
`

const NavLink = styled(Link)`
  height: ${HeaderSize.NavHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
`
