import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Account } from './context'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default function Connection() {
  const { account } = useContext(Account)
  const { chain } = useContext(Account)

  const web3 = new Web3(Web3.givenProvider)

  const wei = web3.utils.toWei('0.001', 'ether')

  const buy = async () => {
    if (!web3.currentProvider) {
      const getProvider = async () => {
        const provider = new WalletConnectProvider({
          infuraId: '26766d6b478542fe904cf4bb3da45744',
        })
        await provider.enable()
        return provider
      }

      let provider = await getProvider()
      web3.setProvider(provider)
    }
    console.log('address', account)
    web3.eth.sendTransaction(
      {
        from: account,
        to: '0x82597C9029a2D8a7ea7A8BA9241799e86248887d',
        value: wei,
      },
      (error, result) => {
        console.log(result)
        console.log(error)
      }
    )
  }
  return (
    <div className="results">
      {account && (
        <div className="accounts">
          <div>
            <h1>Account</h1>
            <p>{account}</p>
          </div>

          {chain && (
            <div>
              <h1>Chain ID</h1>
              <p>{chain}</p>
            </div>
          )}

          <button className="buy-button" onClick={buy}>
            Buy
          </button>
        </div>
      )}
    </div>
  )
}
