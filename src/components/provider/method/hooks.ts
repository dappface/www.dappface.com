import {useState} from 'react'

import {MethodEntity, ParamEntity} from '../context'

export function useSubmitter(method: MethodEntity, params: ParamEntity[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<{[key: string]: any} | undefined>(
    undefined,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    try {
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
    setResult,
    errorMessage,
    setErrorMessage,
    submit,
    isSubmitting,
  }
}
