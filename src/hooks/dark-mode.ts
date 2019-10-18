import {createContext, useCallback, useContext, useState} from 'react'
import {ThemeMode} from '../const'

export function useToggleDarkMode() {
  const {mode, setMode} = useContext(ThemeModeContext) as ThemeModeContextValue
  const toggleDarkMode = useCallback(() => {
    setMode(mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark)
  }, [mode])

  return toggleDarkMode
}

interface ThemeModeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

export const ThemeModeContext = createContext<
  ThemeModeContextValue | undefined
>(undefined)

export function useThemeMode(): ThemeModeContextValue {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [mode, setMode] = useState(isDark ? ThemeMode.Dark : ThemeMode.Light)

  return {
    mode,
    setMode,
  }
}
