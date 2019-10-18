import React from 'react'
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'

import {lightTheme, darkTheme, ThemeMode} from '../const'
import {ThemeModeContext, useThemeMode} from '../hooks'
import {Header} from './header'

interface Props {
  children: JSX.Element | JSX.Element[]
}

export function Layout({children}: Props): JSX.Element {
  const themeMode = useThemeMode()

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider
        theme={themeMode.mode === ThemeMode.Dark ? darkTheme : lightTheme}>
        <>
          <GlobalStyle />
          <Container>
            <Header />
            {children}
          </Container>
        </>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const Container = styled.div`
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.color};
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
