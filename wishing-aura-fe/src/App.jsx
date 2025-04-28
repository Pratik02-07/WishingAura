import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src="/logo.png" className="logo" alt="Wishing Aura Logo" style={{ maxWidth: '400px', margin: '2rem auto', display: 'block' }} />
      </div>
      <h1>WishingAura</h1>
      <div className="card">
        <p>
          <code>Launching Soon</code> 
        </p>
      </div>
    </>
  )
}

export default App
