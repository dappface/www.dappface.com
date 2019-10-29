import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../../components/layout'
import {SEO} from '../../components/seo'
import {Size} from '../../const'

export default function({location}: PageRendererProps): JSX.Element {
  return (
    <Layout location={location}>
      <>
        <SEO title='Contact' />
        <Container>
          <Header>Contact</Header>
          <Form
            action={`https://api.${process.env.GATSBY_DOMAIN}/contact`}
            method='post'>
            <Field>
              <Label htmlFor='name'>Name</Label>
              <input type='text' id='name' name='name' required />
              <HelperText>required</HelperText>
            </Field>

            <Field>
              <Label htmlFor='email'>Email</Label>
              <input type='text' id='email' name='email' required />
              <HelperText>required</HelperText>
            </Field>

            <Field>
              <Label htmlFor='message'>Message</Label>
              <textarea id='message' name='message' required />
              <HelperText>required</HelperText>
            </Field>

            <input
              type='hidden'
              name='_next'
              value={`https://www.${process.env.GATSBY_DOMAIN}/contact/thanks`}
            />

            <SubmitButton type='submit'>Submit</SubmitButton>
          </Form>
        </Container>
      </>
    </Layout>
  )
}

const Container = styled.main`
  align-items: center;
`

const Header = styled.h2`
  max-width: 800px;
  width: 100vw;
  padding: ${Size.Margin16}px;
  color: ${({theme}): string => theme.color.high};
`

const Form = styled.form`
  max-width: 800px;
  width: 100vw;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 ${Size.Margin16}px;

  input,
  textarea {
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

  input {
    height: 32px;
  }

  textarea {
    min-height: 100px;
  }
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${Size.Margin8}px;
`

const Label = styled.label`
  color: ${({theme}): string => theme.color.high};
  padding: ${Size.Margin8}px 0;
`

const HelperText = styled.div`
  padding: ${Size.Margin8}px;
  font-size: 12px;
`

const SubmitButton = styled.button`
  align-self: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 4px;

  ${({theme}): string => `
    color: ${theme.color.high};
    border: 2px solid ${theme.color.high};
  `}
`
