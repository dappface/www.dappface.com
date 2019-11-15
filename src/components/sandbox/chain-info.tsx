import React, {useEffect, useMemo, useState} from 'react'
import styled from 'styled-components'

import {useEthereum} from '../../hooks'

export function ChainInfo(): JSX.Element {
  const chainName = useChainName()
  return <Container>{chainName}</Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function useChainName(): string {
  const [chainId, setChainId] = useState('')
  const ethereum = useEthereum()

  const chainName = useMemo(() => {
    if (!chainInfo[chainId]) {
      return '···'
    }
    return chainInfo[chainId].name
  }, [chainId])

  useEffect(() => {
    ;(async (): Promise<void> => {
      const res = await ethereum.send('eth_chainId')
      setChainId(res.result)
    })()
  }, [])

  useEffect(() => {
    ethereum.on('chainChanged', setChainId)

    return (): void => {
      ethereum.removeListener('chainChanged', setChainId)
    }
  }, [])

  return chainName
}

enum ChainId {
  Mainnet = '0x01',
  Ropsten = '0x03',
  Kovan = '0x2a',
  Rinkeby = '0x04',
  Goerli = '0x05',
}

const chainInfo: ChainInfo = {
  [ChainId.Mainnet]: {
    name: 'Mainnet Ethereum Chain',
  },
  [ChainId.Ropsten]: {
    name: 'Ropsten Test Chain',
  },
  [ChainId.Kovan]: {
    name: 'Kovan Test Chain',
  },
  [ChainId.Rinkeby]: {
    name: 'Rinkeby Test Chain',
  },
  [ChainId.Goerli]: {
    name: 'Goerli Test Chain',
  },
}

interface ChainInfo {
  [key: string]: {
    name: string
  }
}
