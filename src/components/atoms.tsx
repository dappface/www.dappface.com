import React from 'react'
import styled from 'styled-components'
import {IoMdClose} from 'react-icons/io'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClose?: () => void
}

export function InputField({onClose, ...inputProps}: Props): JSX.Element {
  return (
    <Container>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Input
        type='text'
        autoCapitalize='off'
        autoComplete='off'
        {...inputProps}
      />
      {onClose ? (
        <RemoveButton type='button' onClick={onClose}>
          <IoMdClose />
        </RemoveButton>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  > button {
    display: none;
  }

  &:hover {
    > button {
      display: flex;
    }
  }
`

const Input = styled.input`
  width: 100%;
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
