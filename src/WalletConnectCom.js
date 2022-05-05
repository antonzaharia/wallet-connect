import React from 'react'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { useContext } from 'react'
import { Account } from './context'

export default function WalletConnectCom() {
  const { setAccount } = useContext(Account)
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
    setAccount(accounts[0])
    QRCodeModal.close()
    console.log(payload)
  })

  connector.on('session_update', (error, payload) => {
    if (error) {
      throw error
    }
    const { accounts, chainId } = payload.params[0]
    setAccount(accounts[0])
    QRCodeModal.close()
  })

  connector.on('disconnect', (error, payload) => {
    if (error) {
      throw error
    }
    setAccount(null)
  })
  const handleOnClick = () => {
    QRCodeModal.open(connector.uri)
  }
  const disconnect = () => {
    if (connector.connected) {
      connector.killSession()
    } else {
      alert('Connect before disconnecting!')
    }
  }
  return (
    <div>
      <header className="App-header">Wallet connect</header>
      <div className="content">
        <button className="connect-button" onClick={handleOnClick}>
          Connect
        </button>
        <button className="connect-button" onClick={disconnect}>
          Disconnect
        </button>
      </div>
    </div>
  )
}
