import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'

import {lightTheme, darkTheme} from '../const'
import {ThemeModeContext, useHasMounted, useThemeMode} from '../hooks'
import {Header} from './header'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function Layout({children}: Props): JSX.Element {
  const themeMode = useThemeMode()
  const hasMounted = useHasMounted()

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <>
        <GlobalStyle hasMounted={hasMounted} />
        <Container hasMounted={hasMounted}>
          <Header />
          {children}
        </Container>
      </>
    </ThemeModeContext.Provider>
  )
}

interface GlobalStyleProps {
  hasMounted: boolean
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab:300,400&display=swap');

  body {
    margin: 0;

    &.light {
      background: ${lightTheme.background};
      color: ${lightTheme.color};
    }

    &.dark {
      background: ${darkTheme.background};
      color: ${darkTheme.color};
    }
    ${({hasMounted}) => (hasMounted ? 'transition: all 0.2s ease-out;' : '')}}
  }

  a, button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    text-decoration: none;
  }
`

interface ContainerProps {
  hasMounted: boolean
}

const Container = styled.div<ContainerProps>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: 'Roboto Mono', monospace;

  ${({hasMounted}): string =>
    hasMounted
      ? `

      a, button {
        transition: opacity 0.2s ease-out;
      }
  `
      : ''}

  a, button {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`
