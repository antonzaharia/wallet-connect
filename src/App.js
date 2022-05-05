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
    } else {
      return <WalletConnectCom />
    }
  }
  return (
    <AccountProvider>
      <div className="App">
        <Connection />
        {renderMetamaskConnect()}
      </div>
    </AccountProvider>
  )
}
export default App
