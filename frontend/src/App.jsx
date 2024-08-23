import { useState } from 'react'
import './App.css'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
