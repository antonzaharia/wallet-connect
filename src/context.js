import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'

const Account = createContext({})

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [chain, setChain] = useState(null)

  return <Account.Provider value={{ account, setAccount, chain, setChain }}>{children}</Account.Provider>
}

AccountProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export { Account, AccountProvider }
