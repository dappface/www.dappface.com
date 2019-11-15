import {IEthereumProvider} from '@dappface/ethereum-provider'
import {createContext, useContext, useEffect, useState} from 'react'

const EthereumContext = createContext<IEthereumProvider | undefined>(undefined)

export const {Provider: EthereumProvider} = EthereumContext

export function useInitEthereum(): IEthereumProvider | undefined {
  const [ethereum, setEthereum] = useState<IEthereumProvider | undefined>()

  useEffect((): void => {
    if (!window.ethereum) {
      return
    }
    setEthereum(window.ethereum)
  }, [])

  return ethereum
}

export function useEthereum(): IEthereumProvider {
  return useContext(EthereumContext) as IEthereumProvider
}
