import {useEffect, useMemo, useRef, useState} from 'react'

import {MethodEntity, ParamEntity} from '../context'

export function useSubmitter(method: MethodEntity, params: ParamEntity[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<{[key: string]: any} | undefined>(
    undefined,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {subscriptionId, subscribe, unsubscribe} = useSubscription(
    setResult,
    setErrorMessage,
  )

  const submitText = useMemo(() => {
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
        window.ethereum
          .send(method.value, params.map(({value}) => value))
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
