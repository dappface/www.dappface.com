import React from 'react'
import {PageRendererProps} from 'gatsby'
import styled from 'styled-components'

import {Layout} from '../../components/layout'
import {SEO} from '../../components/seo'

export default function({location}: PageRendererProps): JSX.Element {
  return (
    <Layout location={location}>
      <SEO title='Contact' />
      <Container>
        <h2>Thank you.</h2>
        <p>We will get back to you soon.</p>
      </Container>
    </Layout>
  )
}

const Container = styled.main`
  align-items: center;
  justify-content: center;
`
