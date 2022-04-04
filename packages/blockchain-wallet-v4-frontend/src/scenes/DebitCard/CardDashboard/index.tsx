import React from 'react'
import styled from 'styled-components'

const Iframe = styled.iframe`
  border: 0;
  height: 200px;
`

const CardDashboard = ({ cardToken, domains }) => {
  return (
    <>
      <Iframe
        id='marqeta-card-iframe'
        src={`${domains.walletHelper}/wallet-helper/marqeta-card/#/${cardToken}`}
      />
    </>
  )
}

export default CardDashboard
