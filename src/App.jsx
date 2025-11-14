import React from 'react'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>ROMI Calculator</h1>
        <p>Calculate with ROMI units</p>
      </header>
      <Calculator />
    </div>
  )
}

export default App
