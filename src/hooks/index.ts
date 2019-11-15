import {IEthereumProvider} from '@dappface/ethereum-provider'

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
    ethereum?: IEthereumProvider
  }
}
