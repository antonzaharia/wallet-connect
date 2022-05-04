import React from 'react'
import { useContext, useEffect } from 'react'
import { Account } from './context'
import Web3 from 'web3'

export default function Connection() {
  const { account, setAccount } = useContext(Account)
  const { chain } = useContext(Account)

  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
  const wei = web3.utils.toWei('0.001', 'ether')

  const buy = () => {
    web3.eth.sendTransaction(
      {
        from: account,
        to: '0x82597C9029a2D8a7ea7A8BA9241799e86248887d',
        value: wei,
      },
      (error, result) => {
        console.log(result)
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
