import React from 'react'
import styled from 'styled-components'

import {Layout} from '../components/layout'
import {Size} from '../const'

export default function() {
  return (
    <Layout>
      <PaddingHorizontal>Contact</PaddingHorizontal>
    </Layout>
  )
}

const PaddingHorizontal = styled.div`
  padding: ${Size.Margin16}px 0;
`
