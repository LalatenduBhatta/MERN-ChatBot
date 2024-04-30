// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"

function App() {
  return (
  <main>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/chat" element={<Chat/>}></Route>
      <Route path="/*" element={<NotFound/>}></Route>
    </Routes>
  </main>
  )
}

export default App