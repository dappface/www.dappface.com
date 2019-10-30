import React from 'react'

import {RawMethod, GetBalanceMethod} from './method'

export function EthereumPlayground(): JSX.Element {
  return (
    <>
      <RawMethod method='eth_accounts' />
      <RawMethod method='eth_coinbase' />
      <GetBalanceMethod />
      <RawMethod method='eth_subscribe' params={['newHeads']} />
    </>
  )
}
