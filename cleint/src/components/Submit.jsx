import React, { useState,useEffect } from 'react'
import Nav from './Nav'
import Dppform from './Dppform'
import Testform from './Testform'
import Noselect from './Noselect'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Submit = () => {

  const [selectedValue, setSelectedValue] = useState(<Noselect />);
  const [rootUser,setRootUser] = useState({});
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
    setRootUser(user);
    console.log(user);

    } catch (error) {
      console.log(error);
      history("/login",{replace:true});
    }
    

  }

  useEffect(() => {
    
    getUserData();

  }, []);



  function selectChange(e) {
    if (e.target.value === 'st') {
      setSelectedValue(<Noselect />)
    } else if (e.target.value === 'dpp') {
      setSelectedValue(<Dppform user={rootUser.email} />)
    } else if (e.target.value === 'test') {
      setSelectedValue(<Testform user={rootUser.email} />)
    }
  }


  return (
    <>
      <Nav />
      <div className="container d-flex d-flex justify-content-center ">
        <div className="row g-3 border border-warning p-3 subform shadow p-3 mb-5  rounded">
          <select
            className="form-select form-select-sm  p-3"
            aria-label="Default select example"
            id="typeSelect"
            onChange={selectChange}
          >
            <option defaultValue value="st">
              SELECT TYPE
            </option>
            <option value="dpp">DPP</option>
            <option value="test">TEST</option>
          </select>
          <div id="inputArea" className="row g-3 p-3">
            {selectedValue}
          </div>
        </div>
      </div>
    </>
  )
}

export default Submit
