import React from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { useState, useContext } from 'react'
import { Account } from './context'

export default function WalletConnectCom() {
  const [chain, setChainId] = useState(null)
  const { account, setAccount } = useContext(Account)
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
    setAccount(accounts)
    setChainId(chainId)
    QRCodeModal.close()
  })

  connector.on('session_update', (error, payload) => {
    if (error) {
      throw error
    }
    const { accounts, chainId } = payload.params[0]
    setAccount(accounts)
    setChainId(chainId)
    QRCodeModal.close()
  })

  connector.on('disconnect', (error, payload) => {
    if (error) {
      throw error
    }
    setAccount(null)
    setChainId(null)
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
      {(account || chain) && (
        <div className="results">
          <h1>Accounts</h1>
          <p>{account}</p>
          <br />
          <h1>Chain ID</h1>
          <p>{chain}</p>
        </div>
      )}
    </div>
  )
}
