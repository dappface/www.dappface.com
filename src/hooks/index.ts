import {ThemeMode} from '../const'

export * from './dark-mode'
export * from './ethereum'
export * from './has-mounted'
export * from './sandbox'

declare global {
  interface Window {
    __theme: ThemeMode
    __onThemeChange: () => void
    __setPreferredTheme: (mode: ThemeMode) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
    web3?: any
  }
}
