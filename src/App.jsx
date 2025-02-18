import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
