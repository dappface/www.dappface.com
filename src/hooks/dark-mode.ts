import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {ThemeMode} from '../const'

export function useToggleDarkMode(): () => void {
  const {mode, setMode} = useContext(ThemeModeContext) as ThemeModeContextValue
  const toggleDarkMode = useCallback(() => {
    const value = mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    window.__setPreferredTheme(value)
    setMode(value)
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

declare global {
  interface Window {
    __theme: ThemeMode
    __onThemeChange: () => void
    __setPreferredTheme: (mode: ThemeMode) => void
  }
}
