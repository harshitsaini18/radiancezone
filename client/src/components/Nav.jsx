import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Logout from './Logout'
const logo = require('./img/logo1.png')

const Nav = () => {
  const [rootUser, setRootUser] = useState({})
  const [isLogin, setIsLogin] = useState(false)
  const history = useNavigate()

  //assigning location variable
  const location = useLocation()

  //destructuring pathname from location
  const { pathname } = location

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split('/')


  

  async function getUserData() {
    try {
      let res = await axios.get(`/submit`, {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      let user = res.data;
      setRootUser(user)
      setIsLogin(true)

      console.log(user)
    } catch (error) {
      console.log(error)
      setIsLogin(false)
    }
  }


  

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light "
      style={{ zIndex: '5', background: '#04070e' }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="ps" className="logo1" />
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item m-2 ">
              <NavLink
                className={
                  splitLocation[1] === ''
                    ? 'nnactive nav-link nactive rounded text-light fw-bold'
                    : 'nav-link nactive rounded text-light fw-bold'
                }
                aria-current="page"
                to="/ "
              >
                Home <i className="fad fa-home"></i>
              </NavLink>
            </li>
            <li className="nav-item m-2 ">
              <NavLink
                className={
                  splitLocation[1] === 'analysis'
                    ? 'nnactive nav-link nactive rounded text-light fw-bold'
                    : 'nav-link nactive rounded text-light fw-bold'
                }
                to="/analysis"
              >
                Analysis <i className="fad fa-bullseye-arrow"></i>
              </NavLink>
            </li>
            <li className="nav-item m-2 ">
              <NavLink
                className={
                  splitLocation[1] === 'submit'
                    ? 'nnactive nav-link nactive rounded text-light fw-bold'
                    : 'nav-link nactive rounded text-light fw-bold'
                }
                to="/submit"
              >
                Submit Data <i className="fad fa-box-full"></i>
              </NavLink>
            </li>
          </ul>
        </div>
          {isLogin ? (
           <Logout name={rootUser} />
          ) : (
            <li className="nav-item m-2 mb-2 signup" style={{ listStyleType: "none" }}>
            <NavLink
              className={
                splitLocation[1] === 'signup'
                  ? 'nnactive nav-link nactive rounded text-light fw-bold'
                  : 'nav-link nactive rounded text-light fw-bold'
              }
              to="/signup"
            >
               SignUp
              <i class="fa-duotone fa-user-plus"></i>
            </NavLink>
        </li>
          )}
      </div>
    </nav>
  )
}

export default Nav
