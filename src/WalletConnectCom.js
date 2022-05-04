import React from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { useState } from 'react'

export default function WalletConnectCom() {
  const [cAccounts, setCAccounts] = useState(null)
  const [cChainId, setCChainId] = useState(null)
  const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
  })
  if (!connector.connected) {
    connector.createSession()
  }
  connector.on('connect', (error, payload) => {
    if (error) {
      throw error
    }
    const { accounts, chainId } = payload.params[0]
    setCAccounts(accounts)
    setCChainId(chainId)
    QRCodeModal.close()
  })

  connector.on('session_update', (error, payload) => {
    if (error) {
      throw error
    }
    const { accounts, chainId } = payload.params[0]
    setCAccounts(accounts)
    setCChainId(chainId)
    QRCodeModal.close()
  })

  connector.on('disconnect', (error, payload) => {
    if (error) {
      throw error
    }
    setCAccounts(null)
    setCChainId(null)
  })
  const handleOnClick = () => {
    QRCodeModal.open(connector.uri)
  }
  return (
    <div>
      <header className="App-header">Wallet connect</header>
      <div className="content">
        <button className="connect-button" onClick={handleOnClick}>
          Connect
        </button>
        <button className="connect-button" onClick={() => connector.killSession()}>
          Disconnect
        </button>
      </div>
      {(cAccounts || cChainId) && (
        <div className="results">
          <h1>Accounts</h1>
          <p>{cAccounts}</p>
          <br />
          <h1>Chain ID</h1>
          <p>{cChainId}</p>
        </div>
      )}
    </div>
  )
}
