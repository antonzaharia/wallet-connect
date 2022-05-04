import React from 'react'
import './App.css'
import WalletConnectCom from './WalletConnectCom'
import Metamask from './Metamask'
import { AccountProvider } from './context'
import Connection from './Connection'

function App() {
  const renderMetamaskConnect = () => {
    if (window.ethereum) {
      return (
        <div>
          <Metamask />
          {/* Other wallets */}
        </div>
      )
    }
  }
  return (
    <AccountProvider>
      <div className="App">
        <Connection />
        <WalletConnectCom />
        {renderMetamaskConnect()}
      </div>
    </AccountProvider>
  )
}
export default App
