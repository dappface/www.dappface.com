import {IEthereumProvider} from '@dappface/ethereum-provider'
import {createContext, useContext, useEffect, useState} from 'react'

const EthereumContext = createContext<IEthereumProvider | undefined>(undefined)

export const {Provider: EthereumProvider} = EthereumContext

export function useInitEthereum(): IEthereumProvider | undefined {
  const [ethereum, setEthereum] = useState<IEthereumProvider | undefined>()

  useEffect((): void => {
    if (window.ethereum) {
      setEthereum(window.ethereum)
      return
    }
    if (window.web3 && window.web3.currentProvider) {
      setEthereum(window.web3.currentProvider)
    }
  }, [])

  return ethereum
}

export function useEthereum(): IEthereumProvider {
  return useContext(EthereumContext) as IEthereumProvider
}
