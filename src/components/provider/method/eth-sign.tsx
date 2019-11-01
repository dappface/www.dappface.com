import React, {useState} from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'
import {RawMethod} from './raw'

export function EthSignMethod(): JSX.Element {
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')

  return (
    <RawMethod method='eth_sign' params={[from, message]}>
      <Field>
        <Label htmlFor='from'>from</Label>
        <input
          id='from'
          type='text'
          placeholder='0x000...'
          onChange={e => setFrom(e.target.value)}
        />
        <Label htmlFor='message'>message</Label>
        <input
          id='message'
          type='text'
          placeholder='my message...'
          onChange={e => setMessage(e.target.value)}
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
