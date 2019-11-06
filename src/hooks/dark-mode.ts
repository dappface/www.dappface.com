import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {ThemeMode} from '../const'

export function useDarkMode(): {
  isDarkMode: boolean
  toggleDarkMode: () => void
} {
  const {mode, setMode} = useContext(ThemeModeContext) as ThemeModeContextValue

  const isDarkMode = mode === ThemeMode.Dark

  const toggleDarkMode = useCallback(() => {
    const value = isDarkMode ? ThemeMode.Light : ThemeMode.Dark
    window.__setPreferredTheme(value)
    setMode(value)
  }, [isDarkMode])

  return {isDarkMode, toggleDarkMode}
}

interface ThemeModeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

export const ThemeModeContext = createContext<
  ThemeModeContextValue | undefined
>(undefined)

export function useThemeMode(): ThemeModeContextValue {
  const [mode, setMode] = useState(ThemeMode.Light)

  useEffect(() => {
    setMode(window.__theme)
    window.__onThemeChange = (): void => {
      setMode(window.__theme)
    }
  }, [])

  return {
    mode,
    setMode,
  }
}
