import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import styled from 'styled-components'
import {IoMdClose} from 'react-icons/io'

import {Size} from '../../../const'

interface Props {
  method?: string
  params?: Param[]
}

export interface Param {
  name: string
  value: string
  placeholder?: string
}

export function CustomMethod(props: Props): JSX.Element {
  const [method, setMethod] = useState(props.method || '')
  const {params, addParam, removeParamFactory, onChangeFactory} = useParams()
  const {result, setResult, errorMessage, setErrorMessage, run} = useSubmitter(
    method,
    params,
  )
  const {subscriptionId, subscribe, unsubscribe} = useSubscription(
    setResult,
    setErrorMessage,
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
      <Field>
        <input
          type='text'
          placeholder='method name (e.g. eth_accounts)'
          onChange={e => {
            setMethod(e.target.value)
          }}
          value={method}
        />
      </Field>

      <Params>
        {params.map((param, i) => (
          <Field key={param.name}>
            <ParamInput
              type='text'
              placeholder={param.placeholder || 'params'}
              onChange={onChangeFactory(i)}
              value={param.value}
            />
            <RemoveButton onClick={removeParamFactory(i)}>
              <IoMdClose />
            </RemoveButton>
          </Field>
        ))}
      </Params>

      <Field>
        <button onClick={addParam}>+ Param</button>
      </Field>
      <Field>{button}</Field>

      <Result>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        {typeof result !== 'undefined' ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : null}
      </Result>
    </Container>
  )
}

function useParams(initialParams: Param[] = []) {
  const [params, setParams] = useState<Param[]>(initialParams || [])
  const [count, setCount] = useState(0)

  const addParam = useCallback(() => {
    setParams([...params, {name: `params${count}`, value: ''}])
    setCount(count + 1)
  }, [params])

  const removeParamFactory = useCallback(
    (i: number) => () => {
      setParams([...params.slice(0, i), ...params.slice(i + 1)])
    },
    [params],
  )

  const onChangeFactory = useCallback(
    i => (e: React.ChangeEvent<HTMLInputElement>) => {
      setParams(
        params.map((param, ii) =>
          i === ii ? {...param, value: e.target.value} : param,
        ),
      )
    },
    [params],
  )

  return {params, addParam, removeParamFactory, onChangeFactory}
}

function useSubmitter(method: string, params: Param[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<{[key: string]: any} | undefined>(
    undefined,
  )
  const [errorMessage, setErrorMessage] = useState('')

  async function run(): Promise<void> {
    setErrorMessage('')
    try {
      const call = new Promise((resolve, reject) => {
        window.ethereum
          .send(method, params)
          .then((newResult: any) => {
            setResult(newResult)
            resolve()
          })
          .catch(reject)
      })
      const timeout = new Promise((_, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id)
          reject(new Error('timeout'))
        }, 8000)
      })
      await Promise.race([call, timeout])
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return {result, setResult, errorMessage, setErrorMessage, run}
}

function useSubscription(
  setResult: any,
  setErrorMessage: (error: string) => void,
) {
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

  return {subscriptionId, subscribe, unsubscribe}
}

const Container = styled.div`
  width: 100%;

  input {
    height: 32px;

    outline: none !important;
    color: ${({theme}): string => theme.color.medium};
    background: ${({theme}): string => theme.background};
    border-width: 0;
    border-bottom-width: 2px;
    border-bottom-color: ${({theme}): string => theme.color.disabled};
    transition: all 0.2s ease-out;

    &:focus {
      border-bottom-color: ${({theme}): string => theme.color.high};
    }
  }
`

const Field = styled.div`
  width: 100%;
  padding: ${Size.Margin8}px ${Size.Margin16}px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`

const Params = styled.div`
  padding-left: ${Size.Margin16}px;
`

const RemoveButton = styled.button`
  position: absolute;
  align-self: flex-end;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ParamInput = styled.input`
  flex: 1;
`

const Result = styled.div`
  overflow: scroll;
  padding: 0 ${Size.Margin16}px;
`

const ErrorMessage = styled.div`
  color ${({theme}): string => theme.color.error};
`

const Button = styled.button`
  cursor: pointer;
`
