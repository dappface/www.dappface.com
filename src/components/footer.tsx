import React from 'react'
import styled from 'styled-components'

import {Size} from '../const'

export function Footer(): JSX.Element {
  return (
    <Container>
      <CopyRight>&copy; {new Date().getFullYear()} DAPPFACE</CopyRight>
    </Container>
  )
}

const Container = styled.footer`
  display: flex;
  height: 90px;
  padding: 0 ${Size.Margin16}px;
  align-items: center;
  justify-content: center;
`

const CopyRight = styled.p`
  color: ${({theme}): string => theme.color.disabled};
  font-size: ${Size.Font12}px;
`
