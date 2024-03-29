import React from 'react'
import styled from 'styled-components'

import {Size} from '../../../const'
import {InputField} from '../../atoms'
import {
  useSandboxContext,
  useSandboxSelector,
  getMethodFactory,
  getParams,
} from '../../../hooks'
import {useSubmitter} from './hooks'
import {Param} from './param'

interface Props {
  id: string
}

export function Method({id}: Props): JSX.Element {
  const {
    onChangeMethodFactory,
    removeMethodFactory,
    addParam,
  } = useSandboxContext()
  const method = useSandboxSelector(getMethodFactory(id))
  const params = useSandboxSelector(getParams(method.id))
  const {submit, isSubmitting, result, errorMessage, submitText} = useSubmitter(
    method,
    params,
  )

  return (
    <Container onSubmit={submit}>
      <InputField
        placeholder='method name'
        onChange={onChangeMethodFactory(method)}
        value={method.value}
        onClose={removeMethodFactory(method)}
      />
      <ParamsContainer>
        {method.paramIds.map(paramId => (
          <Param key={paramId} id={paramId} />
        ))}
        <button
          type='button'
          onClick={(): void => {
            addParam(method)
          }}>
          + Param
        </button>
      </ParamsContainer>

      <RunContainer>
        {isSubmitting ? '...' : <input type='submit' value={submitText} />}
      </RunContainer>

      <Result>
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        {typeof result !== 'undefined' ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : null}
      </Result>
    </Container>
  )
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${Size.Margin8}px 0;
`

const ParamsContainer = styled.div`
  padding-left: ${Size.Margin16}px;
`

const RunContainer = styled.div`
  align-self: center;
`

const Result = styled.div`
  overflow: scroll;
  padding: 0 ${Size.Margin16}px;
`

const ErrorMessage = styled.div`
  color ${({theme}): string => theme.color.error};
`
