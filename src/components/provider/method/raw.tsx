import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'
import {Button} from '../../atoms'

interface Props {
  method: string
  params?: any[]
  children?: JSX.Element | JSX.Element[]
}

export function RawMethod({method, params, children}: Props) {
  const [result, setResult] = useState<string[] | undefined>()
  const [errorMessage, setErrorMessage] = useState('')

  async function run(): Promise<void> {
    setErrorMessage('')
    try {
      const newResult = await window.ethereum.send(method, params)
      setResult(newResult)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const [subscriptionId, setSubscriptionId] = useState<string | undefined>(
    undefined,
  )

  function onNotificationFactory(id: string) {
    return (newResult: any) => {
      if (newResult.subscription !== id) {
        return
      }

      if (newResult.result instanceof Error) {
        setErrorMessage(newResult.result)
        return
      }

      setResult(newResult.result)
    }
  }

  const notificationListener = useRef<(result: any) => void>()

  async function subscribe(): Promise<void> {
    const id = await window.ethereum.send('eth_subscribe', ['newHeads'])
    setSubscriptionId(id)
    notificationListener.current = onNotificationFactory(id)
    window.ethereum.on('notification', notificationListener.current)
  }

  async function unsubscribe(): Promise<void> {
    if (!subscriptionId) {
      return
    }
    await window.ethereum.send('eth_unsubscribe', [subscriptionId])
    if (notificationListener.current) {
      window.ethereum.removeListener(
        'notification',
        notificationListener.current,
      )
    }
    notificationListener.current = undefined
    setSubscriptionId(undefined)
    setResult(undefined)
  }

  useEffect(
    () => () => {
      if (!subscriptionId) {
        return
      }
      window.ethereum.send('eth_unsubscribe', [subscriptionId])
    },
    [subscriptionId],
  )

  return (
    <Container>
      <Header>
        <h3>{method}</h3>
        {method.split('_')[1] === 'subscribe' ? (
          subscriptionId ? (
            <Button onClick={unsubscribe}>Unsubscribe</Button>
          ) : (
            <Button onClick={subscribe}>Subscribe</Button>
          )
        ) : (
          <Button onClick={run}>Run</Button>
        )}
      </Header>

      {children}

      <Result>
        {errorMessage ? <Error>{errorMessage}</Error> : null}
        {typeof result !== 'undefined' ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : null}
      </Result>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${Size.Margin16}px;
`

const Result = styled.div`
  overflow: scroll;
  padding: 0 ${Size.Margin16}px;
`

const Error = styled.div`
  color ${({theme}): string => theme.color.error};
`
