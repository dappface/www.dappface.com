import React, {useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'

interface Props {
  method: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any[]
  children?: JSX.Element | JSX.Element[]
}

export function RawMethod({method, params, children}: Props): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<{[key: string]: any} | undefined>()
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (newResult: any): void => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    () => (): void => {
      if (!subscriptionId) {
        return
      }
      window.ethereum.send('eth_unsubscribe', [subscriptionId])
    },
    [subscriptionId],
  )

  const button = useMemo(() => {
    if (method.split('_')[1] === 'subscribe') {
      if (subscriptionId) {
        return <Button onClick={unsubscribe}>Unsubscribe</Button>
      }
      return <Button onClick={subscribe}>Subscribe</Button>
    }

    return <Button onClick={run}>Run</Button>
  }, [method, run, subscriptionId, subscribe, unsubscribe])

  return (
    <Container>
      <Header>
        <Method>{method}</Method>
        {button}
      </Header>

      {children}

      {params ? (
        <Params>
          <div>Params</div>
          <pre>{JSON.stringify(params, null, 2)}</pre>
        </Params>
      ) : null}

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

const Method = styled.h3`
  margin: ${Size.Margin8}px 0;
`

const Params = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${Size.Margin16}px;
`

const Result = styled.div`
  overflow: scroll;
  padding: 0 ${Size.Margin16}px;
`

const Error = styled.div`
  color ${({theme}): string => theme.color.error};
`

const Button = styled.button`
  cursor: pointer;
`
