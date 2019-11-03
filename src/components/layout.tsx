import '../layout/normalize.css'
import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'

import {lightTheme, darkTheme, ThemeMode} from '../const'
import {ThemeModeContext, useHasMounted, useThemeMode} from '../hooks'
import {Header} from './header'
import {Footer} from './footer'
import {SEO} from './seo'

interface Props {
  children: JSX.Element | JSX.Element[]
  location: PageRendererProps['location']
}

export function Layout({children, location}: Props): JSX.Element {
  const themeMode = useThemeMode()
  const hasMounted = useHasMounted()

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider
        theme={themeMode.mode === ThemeMode.Light ? lightTheme : darkTheme}>
        <>
          <SEO />
          <GlobalStyle hasMounted={hasMounted} />
          <Container hasMounted={hasMounted}>
            <Header location={location} />
            {children}
            <Footer />
          </Container>
        </>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

interface GlobalStyleProps {
  hasMounted: boolean
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab:300,400&display=swap');

  html {
    height: 100%;
  }

  body {
    div#gatsby-focus-wrapper {
      display: flex;
      flex: 1;
      min-height: 100vh;
    }

    &.light {
      background: ${lightTheme.background};
      color: ${lightTheme.color.medium};
    }

    &.dark {
      background: ${darkTheme.background};
      color: ${darkTheme.color.medium};
    }

    ${({hasMounted}): string =>
      hasMounted ? 'transition: all 0.2s ease-out;' : ''}
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

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  #copyright {
    &.light {
      color: ${lightTheme.color.disabled};
    }
    &.dark {
      color: ${darkTheme.color.disabled};
    }
  }

  h1 {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

interface ContainerProps {
  hasMounted: boolean
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
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

  > main {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
`
