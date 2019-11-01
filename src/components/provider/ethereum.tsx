import React from 'react'

import {RawMethod, EthGetBalanceMethod, EthSignMethod} from './method'

export function EthereumPlayground(): JSX.Element {
  return (
    <>
      <div>
        <h3>Hooked Methods</h3>
        <div>
          <RawMethod method='eth_accounts' />
          <RawMethod method='eth_coinbase' />
          <EthSignMethod />
        </div>
      </div>

      <div>
        <h3>Methods directly call remote node</h3>
        <div>
          <EthGetBalanceMethod />
          <RawMethod method='eth_subscribe' params={['newHeads']} />
        </div>
      </div>
    </>
  )
}
