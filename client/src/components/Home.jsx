import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Lbtn from './Lbtn'
const logo = require('./img/logo2.png')
const light = require('./img/light.png')
const lamp = require('./img/lamp.png')

const Home = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 7000)
  }, [])


  return (
    <div className="hero">
      <div>
        <nav>
          <img src={logo} alt="img" href="/" className="logo" />
          <div className="tLamp">
            <span className="tl badge bg-secondary border rounded-2 fs-3 ">
              Turns on Study lamp
            </span>

            <Lbtn />
          </div>
        </nav>
        <div className="lamp-container">
          <img src={lamp} alt="img" className="lamp" />
          <img src={light} alt="img" className="light" id="light" />
        </div>
        <div className="text-container">
          <h1>
            Study <br /> in Radiance
          </h1>
          <p>Data of my Growth</p>
          <div className="navBtn">
            <div className="container">
              <div className="hover-box">
                <div className="row">
                  <div className="col-sm-12 ">
                    <Link to="/submit" className="dedcription-btn" href="#">
                      <span className="name-descripeion fw-bold">Submit</span>
                      <div className="btn-icon">
                        <i class="fad fa-box-full"></i>
                      </div>
                    </Link>
                  </div>
                  <div className="col-sm-12 ">
                    <Link to="/analysis" className="dedcription-btn" href="#">
                      <span className="name-descripeion fw-bold">Analysis</span>
                      <div className="btn-icon book">
                        <i class="fad fa-bullseye-arrow"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="control">
            <p>04</p>
            <div className="line">
              <span />
            </div>
            <p>05</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
