import {createContext, useContext, useEffect, useState} from 'react'

const EthereumContext = createContext(undefined)

export const {Provider: EthereumProvider} = EthereumContext

export function useInitEthereum(): any | undefined {
  const [ethereum, setEthereum] = useState<any | undefined>()

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

export function useEthereum(): any | undefined {
  return useContext(EthereumContext)
}
