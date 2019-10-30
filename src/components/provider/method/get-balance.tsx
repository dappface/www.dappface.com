import React, {useState} from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'
import {RawMethod} from './raw'

export function GetBalanceMethod() {
  const [address, setAddress] = useState('')

  function onChangeAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value)
  }

  return (
    <RawMethod method='eth_getBalance' params={[address, 'latest']}>
      <Field>
        <label htmlFor='address'>address</label>
        <input
          id='address'
          type='text'
          placeholder='0x000...'
          onChange={onChangeAddress}
        />
      </Field>
    </RawMethod>
  )
}

const Field = styled.div`
  width: 100%;
  padding: 0 ${Size.Margin16}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
