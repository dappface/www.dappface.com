import React from 'react'
import styled from 'styled-components'

import {InputField} from '../../atoms'
import {useSandboxContext, getParamFactory} from '../context'

interface Props {
  id: string
}

export function Param({id}: Props): JSX.Element {
  const {state, onChangeParamFactory, removeParamFactory} = useSandboxContext()
  const param = getParamFactory(id)(state)

  return (
    <Container>
      <InputField
        type='text'
        placeholder='param'
        onChange={onChangeParamFactory(param)}
        value={param.value}
        onClose={removeParamFactory(param)}
      />
    </Container>
  )
}

const Container = styled.div``
