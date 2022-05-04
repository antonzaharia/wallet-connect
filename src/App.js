import './App.css'

function App() {
  const handleOnClick = () => {
    console.log('connect!')
  }
  return (
    <div className="App">
      <header className="App-header">Wallet connect</header>
      <div className="content">
        <button className="connect-button" onClick={handleOnClick}>
          Connect
        </button>
        <div className="results"></div>
      </div>
    </div>
  )
}

export default App
