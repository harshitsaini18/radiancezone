import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dppform = (props) => {
  const history = useNavigate()
  const [dpp, setDpp] = useState({
    typer:"dpp",
    subject: 'physics',
    marks: '',
    complete: '',
    user:props.user
  })
console.log(dpp);
  const PostData = (e) => {

     axios.post('/submit', dpp)
    .then(function (response) {
      console.log(response)
      if (response.data) {
        new Swal({
          title: 'Your dpp have submited successful',
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

  let name, value
  const handelInput = (e) => {
    name = e.target.name
    value = e.target.value
    setDpp({ ...dpp, [name]: value })
  }

 

  return (
    <div>
      <select
        id="dppSelect"
        name="subject"
        onChange={handelInput}
        className="form-select form-select-sm shadow-sm  mb-3"
        aria-label=".form-select-sm example"
      >
        <option defaultValue name="physics" value="physics">
          Physics
        </option>
        <option name="chemistry" value="chemistry">
          Chemistry
        </option>
        <option name="maths" value="maths">
          Maths
        </option>
      </select>
      
      <div className="  p-3 border rounded-3 shadow d-flex justify-content-between flex-wrap">
        <div className="col-md-4 sbox m-2">
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              Marks
            </span>
            <input
              min={0}
              max={100}
              name="marks"
              type="number"
              autoComplete="off"
              value={dpp.marks}
              onChange={handelInput}
              className="form-control "
              style={{ minWidth: 90 }}
              id="dppScore"
              aria-describedby="inputGroupPrepend"
              required
            />
          </div>
        </div>
        <div className="col-md-4 sbox m-2">
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              Complete
            </span>
            <input min={0}
              max={100}
              name="complete"
              type="number"
              autoComplete="off"
              value={dpp.complete}
              onChange={handelInput}
              className="form-control "
              style={{ minWidth: 90 }}
              id="dppComplete"
              aria-describedby="inputGroupPrepend"
              required
            />
          </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            style={{ width: 96 }}
            onClick={PostData}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dppform
