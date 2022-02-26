import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Analysis from './components/Analysis'
import Home from './components/Home'
import Submit from './components/Submit'
import Errpage from './components/Errpage'
import NewNav from './components/NewNav'
import Signup from "./components/Signup";
import Login from './components/Login'
const App = () => {
  return (
    <>
      
      <Router>{window.screen.width<600?(<NewNav/>):(<></>)}
        
        <Routes>
          <Route exact path="/" element={<Home />} />       
          <Route exact path="/analysis" element={<Analysis />} />
          <Route exact path="/submit" element={<Submit />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/*" element={<Errpage />} />
        </Routes>
      </Router>       
    </>
  )
}

export default App
