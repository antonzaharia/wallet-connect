import React from 'react'
import { useContext } from 'react'
import { Account } from './context'

export default function Metamask() {
  const { account, setAccount } = useContext(Account)
  const requestAccounts = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])
  }
  window.ethereum.on('disconnect', () => {
    setAccount(null)
  })
  return (
    <div>
      <header className="App-header">Metamask</header>
      <div className="content">
        <button className="connect-button" onClick={requestAccounts}>
          Connect
        </button>
      </div>
    </div>
  )
}
