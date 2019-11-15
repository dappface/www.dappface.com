import {useEffect, useMemo, useRef, useState} from 'react'

import {MethodEntity, ParamEntity, useEthereum} from '../../../hooks'

interface Submitter {
  submitText: string
  submit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: {[key: string]: any} | undefined
  errorMessage: string
  isSubmitting: boolean
}

export function useSubmitter(
  method: MethodEntity,
  params: ParamEntity[],
): Submitter {
  const [result, setResult] = useState<Submitter['result']>(undefined)
  const [errorMessage, setErrorMessage] = useState<Submitter['errorMessage']>(
    '',
  )
  const [isSubmitting, setIsSubmitting] = useState<Submitter['isSubmitting']>(
    false,
  )
  const {subscriptionId, subscribe, unsubscribe} = useSubscription(
    setResult,
    setErrorMessage,
  )
  const ethereum = useEthereum()

  const submitText = useMemo<Submitter['submitText']>(() => {
    if (method.value.split('_')[1] === 'subscribe') {
      if (subscriptionId) {
        return 'Unsubscribe'
      }
      return 'Subscribe'
    }

    return 'Run'
  }, [method.value, subscriptionId])

  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setResult(undefined)

    try {
      if (method.value.split('_')[1] === 'subscribe') {
        if (subscriptionId) {
          unsubscribe()
          return
        }
        subscribe()
        return
      }

      const call = new Promise((resolve, reject) => {
        ethereum
          .send(method.value, params.map(({value}) => value))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .then((newResult: any): void => {
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
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    result,
    submitText,
    errorMessage,
    submit,
    isSubmitting,
  }
}

interface Subscription {
  subscriptionId: string | undefined
  subscribe: () => void
  unsubscribe: () => void
}

function useSubscription(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setResult: any,
  setErrorMessage: (error: string) => void,
): Subscription {
  const [subscriptionId, setSubscriptionId] = useState<
    Subscription['subscriptionId']
  >(undefined)
  const ethereum = useEthereum()

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
    const id = await ethereum.send('eth_subscribe', ['newHeads'])
    setSubscriptionId(id)
    notificationListener.current = onNotificationFactory(id)
    ethereum.on('notification', notificationListener.current)
  }

  async function unsubscribe(): Promise<void> {
    if (!subscriptionId) {
      return
    }
    await ethereum.send('eth_unsubscribe', [subscriptionId])
    if (notificationListener.current) {
      ethereum.removeListener('notification', notificationListener.current)
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
      ethereum.send('eth_unsubscribe', [subscriptionId])
    },
    [subscriptionId],
  )

  return {subscriptionId, subscribe, unsubscribe}
}
