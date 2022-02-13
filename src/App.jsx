import { useEffect, useState } from 'react'
import logo from './logo.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Feels from './Pages/Feels'
import { getMoodsAPI } from './Services/API'
import { Header } from './Components/Header'
import ShowFeel from './Pages/ShowFeel'
import Recap from './Pages/Recap'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={
          <PrivateRoute>
            <Feels/>
          </PrivateRoute>
        } />
        <Route exact path="/feel/:id" element={
          <PrivateRoute>
            <ShowFeel/>
          </PrivateRoute>
        } />
        <Route exact path="/recap" element={
          <PrivateRoute>
            <Recap/>
          </PrivateRoute>
        } />
        <Route exact path="/login" element={<Login/>} ></Route>
        <Route exact path="/register" element={<Register/>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
