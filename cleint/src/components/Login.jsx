import React , { useEffect, useRef,useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from "sweetalert2"; 
import Nav from './Nav';
import GoogleLogin from 'react-google-login'
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [hover, setHover] = useState({x:50,y:50});
  const [loginForm, setLoginForm] = useState({
    email:"",
    password:""     
  });
  const history = useNavigate();



  const passkey = useRef(null)
  const d = new Date();
  const authId = '175186966901-bgifj36o8m82hsh8349lh6jfkicn753e.apps.googleusercontent.com'
  function resSuccess(g) {
    console.log(g)
    axios.post("/google",{token:g.tokenId})
    .then(res =>{
      console.log(res);
    })
    history("/",{replace:true});
  }
  function resError(err) {
    console.log(err);
  }
  
  

  function handleChange(e) {
    setLoginForm({...loginForm,[e.target.name]:e.target.value});
  }

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
      history("/login",{replace:true});
    }
    

  }

  useEffect(() => {
    
    getUserData();

  }, []);

  function login(e){
    axios
    .post('/login', loginForm)
    .then(function (response) {
      console.log(response)
      if (response.data.login) {
        new Swal({
          title: 'You have login successful',
          text: 'Thank You',
          icon: 'success',
          button: 'Ok',
        })
        history("/");
      }else{
        new Swal({
          title: 'Please fill correct detail',
          text: 'Sorry',
          icon: 'error',
          button: 'Ok',
        })
      }
    })
    .catch(function (error) {
      console.log(error)
    })
      

  }

  function doHover(e) {
    let xAxis = (-20 + ((e.screenX-316)*140/321))+"%";
    let yAxis = (-20 + ((e.screenX-405)*140/53))+"%";
    setHover({x:xAxis,y:yAxis});
    // console.log((e.screenX-316)*140/321)

    // let yAxis = -20 + (())
  }


  return (
  <>
  <Nav/>
  
<div className="iphones">








  <div className="iphone">
    <header className="header">
      <NavLink to="/" className="button button--small">
        <i className="icon fa-solid fa-chevron-left" />
      </NavLink>
      <h1>Log in</h1>
    </header>
    <main className="main">
      <div>
        <p>Log in with one of the following options.</p>
        <ul className="buttons">
          <li>
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
          <label className="form__label" htmlFor="email">Email</label>
          <input id="email" autoComplete="off" className="lform__input" name="email" value={loginForm.email} onChange={handleChange} type="email" placeholder="example@gmail.com" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="password">Password</label>
          <input id="password" autoComplete="off" className="lform__input" name="password" value={loginForm.password} onChange={handleChange} type="password" placeholder="Enter your password" />
        </div>
        <div className="form__field">
          <button className="mybtn button button--full button--primary" style={{background:` radial-gradient(circle at ${hover.x} ${hover.y},#1cbfff, #00bdff, #00b6ff, #00acff, #009fff, #008fff, #007dff, #006aff, #0055ff, #0041ff, #002fff, #1226ff)`}} onTouchMove={doHover} onMouseMove={doHover} onClick={login} >Log in</button>
        </div>
      </div>
      <div className="text--center">
        <p>Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
      </div>
    </main>
  </div>
</div>



</>
  )
};

export default Login;
