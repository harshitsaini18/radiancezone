import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Testform = (props) => {
  const history = useNavigate()

  const [test, setTest] = useState({
    typer: 'test',
    pmarks: '',
    pcomplete: '',
    cmarks: '',
    ccomplete: '',
    mmarks: '',
    mcomplete: '',
    user:props.user
  })
  let name, value
  const handelInput = (e) => {
    name = e.target.name
    value = e.target.value
    setTest({ ...test, [name]: value })
  }

  const PostData = (e) => {
    
    axios.post('/submit', test)
    .then(function (response) {
      console.log(response)
      if (response.data) {
        new Swal({
          title: 'Your test have submited successful',
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
    // e.preventDefault()
  }

  return (
   <div className='mb-5'>
      <input value="test" name="typer" style={{display: 'none'}}/>

  <div className=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
    <span className="badge bg-warning font-monospace fs-5 bsubject ">Physics</span>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Marks</span>
        <input name="pmarks" value={test.pmarks}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Complete</span>
        <input min={0} max={100} name="pcomplete" value={test.pcomplete}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
  </div>
  <div className=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
    <span className="badge bg-warning font-monospace fs-5 bsubject ">Chemistry</span>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Marks</span>
        <input name="cmarks" value={test.cmarks}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Complete</span>
        <input min={0} max={100} name="ccomplete" value={test.ccomplete}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
  </div>
  <div className=" p-3 border rounded-3 shadow d-flex justify-content-around flex-wrap">
    <span className="badge bg-warning font-monospace fs-5 bsubject ">Maths</span>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Marks</span>
        <input name="mmarks" value={test.mmarks}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
    <div className="col-md-4 m-2">
      <div className="input-group has-validation">
        <span className="input-group-text" id="inputGroupPrepend">Complete</span>
        <input min={0} max={100} name="mcomplete" value={test.mcomplete}
              onChange={handelInput} type="number"  className="form-control" style={{minWidth: 90}} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
      </div>
    </div>
  </div>
  <div className="col-12">
    <button className="btn btn-primary mt-2" onClick={PostData} style={{width: 96}}>Submit</button>
  </div>
</div>

  );
};

export default Testform;
