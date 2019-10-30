import React, {useState} from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'
import {RawMethod} from './raw'

export function GetBalanceMethod(): JSX.Element {
  const [address, setAddress] = useState('')

  function onChangeAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value)
  }

  return (
    <RawMethod method='eth_getBalance' params={[address, 'latest']}>
      <Field>
        <Label htmlFor='address'>address</Label>
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
  padding: ${Size.Margin8}px ${Size.Margin16}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Label = styled.label`
  padding: ${Size.Margin8}px 0;
`
