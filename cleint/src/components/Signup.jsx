import React, {  useState,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login'
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Signup = () => {
  const history = useNavigate();

  async function getUserData() {
    try {
      let res = await axios.get(`/submit`,{
      header:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    let user = res.data;
    // setRootUser(user);
    console.log(user);

    history("/",{replace:true});

    } catch (error) {
      console.log(error);
    }
    

  }

  useEffect(() => {
    
    getUserData();

  }, []);
  const authId = '175186966901-bgifj36o8m82hsh8349lh6jfkicn753e.apps.googleusercontent.com'
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [validation, setValidation] = useState({
    name: {
      error: false,
      success: false,
    },
    email: {
      error: false,
      success: false,
    }, 
    password: {
      error: false,
      success: false,
    },
  })

  //////////////////////////////////////
  //                  ======== Validation Function =========
  //////////////////////////////////////

  function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  function validPassword(password) {
    const re = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    return re.test(String(password))
    // return re
  }
  function validName(name) {
    const re = /^.*(?=.{2,})[a-zA-Z ]*$/
    return re.test(String(name))
  }

  function resSuccess(g) {
    console.log(g)
    axios.post("/google",{token:g.tokenId})
    .then(res =>{
      console.log(res);
    })
  }
  function resError(err) {
    console.log(err);
  }

  //                  ///////////////////////////////////////
  //                  ======== Submit Data Function =========
  //                  //////////////////////////////////////

  function change(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (e.target.name == 'name') {
      setValidation({
        ...validation,
        [e.target.name]: {
          success: validName(e.target.value),
          error: !validName(e.target.value),
        },
      })  
    } else if (e.target.name == 'email') {
      setValidation({
        ...validation,
        [e.target.name]: {
          success: validEmail(e.target.value),
          error: !validEmail(e.target.value),
        },
      })
    } else {
      setValidation({
        ...validation,
        [e.target.name]: {
          success: validPassword(e.target.value),
          error: !validPassword(e.target.value),
        },
      })
    }
  }

  function submitData(e) {
    if (
      validEmail(user.email) &&
      validPassword(user.password) &&
      validName(user.name)
    ) {
      axios
        .post('/signup', user)
        .then(function (response) {
          console.log(response)
          if (response.data.isUser) {
            new Swal({
              title: 'This email already have account',
              text: 'Go to Login',
              icon: 'warning',
              button: 'Ok',
            })
          }else{
            new Swal({
                title: 'Thank you for use our plateform',
                text: 'Go to login page for login',
                icon: 'success',
                button: 'Ok',
              })
              history("/login");
              setUser({
                name: '',
                email: '',
                password: '',
              })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      if (e.target.name == 'name') {
        setValidation({
          ...validation,
          [e.target.name]: {
            success: validName(e.target.value),
            error: !validName(e.target.value),
          },
        })
      } else if (e.target.name == 'email') {
        setValidation({
          ...validation,
          [e.target.name]: {
            success: validEmail(e.target.value),
            error: !validEmail(e.target.value),
          },
        })
      } else {
        setValidation({
          ...validation,
          [e.target.name]: {
            success: validPassword(e.target.value),
            error: !validPassword(e.target.value),
          },
        })
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  /////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///////////////
  /////////////////////////////////////////////////////////////////////////////////
  return (

    <div>
      <Nav/>
      <div className="iphones">
        <div className="iphone">
          <header className="header">
            <NavLink to="/" className="button button--small">
              <i className="icon fa-solid fa-chevron-left" />
            </NavLink>
            <h1>Sign up</h1>
          </header>
          <main className="main">
            <div>
              <p>Sign up with one of the following options.</p>
              <ul className="buttons">
                <li>
                  <GoogleLogin
                    clientId={authId}
                    render={(renderProps) => (
                      <a className="button button--full" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="icon fa-brands fa-google" />
                        <i
                          style={{ fontSize: '10px' }}
                          className="fa-solid fa-plus"
                        ></i>
                      </a>
                    )}
                    buttonText=""
                    onSuccess={resSuccess}
                    onFailure={resError}
                    cookiePolicy={'single_host_origin'}
                  />
                </li>
                <li>
                  <a className="button button--full" href="#">
                    <i className="icon fa-brands fa-apple" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="form">
              <div className="form__field">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="lform__input validation"
                  name="name"
                  type="text"
                  placeholder="Tim"
                  value={user.name}
                  onChange={change}
                  style={{
                    border: validation.name.error
                      ? '2px solid rgb(228, 42, 42)'
                      : 'none',
                  }}
                  //   ref={nameRef}
                />
                <i
                  style={{
                    display: validation.name.success ? 'block' : 'none',
                  }}
                  className="success fa-thin fa-badge-check"
                ></i>
                <i
                  style={{ display: validation.name.error ? 'block' : 'none' }}
                  className="error fa-thin fa-hexagon-exclamation"
                ></i>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className="lform__input validation"
                  name="email"
                  type="email"
                  placeholder="tim@apple.com"
                  value={user.email}
                  onChange={change}
                  style={{
                    border: validation.email.error
                      ? '2px solid rgb(228, 42, 42)'
                      : 'none',
                  }}
                  //   ref={emailRef}
                />
                <i
                  style={{
                    display: validation.email.success ? 'block' : 'none',
                  }}
                  className="success fa-thin fa-badge-check"
                ></i>
                <i
                  style={{ display: validation.email.error ? 'block' : 'none' }}
                  className="error fa-thin fa-hexagon-exclamation"
                ></i>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="password">
                  Password
                </label>
                <input
                  style={{
                    border: validation.password.error
                      ? '2px solid rgb(228, 42, 42)'
                      : 'none',
                  }}
                  id="password"
                  className="lform__input validation"
                  name="password"
                  type="password"
                  placeholder="Pick a strong password"
                  value={user.password}
                  onChange={change}
                  //   ref={passwordRef}
                />
                <i
                  style={{
                    display: validation.password.success ? 'block' : 'none',
                  }}
                  className="success fa-thin fa-badge-check"
                ></i>
                <i
                  style={{
                    display: validation.password.error ? 'block' : 'none',
                  }}
                  className="error fa-thin fa-hexagon-exclamation"
                ></i>
              </div>
              <div className="form__field">
                <button
                  className="button button--full button--primary"
                  type="submit"
                  onClick={submitData}
                >
                  Create Account
                </button>
              </div>
            </div>
            <div className="text--center">
              <p>
                Already have an account? <NavLink to="/submit">Log in</NavLink>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Signup
