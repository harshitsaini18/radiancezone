import React from 'react'
import './spinner.css'

const Spinner = () => {
  return (
    <div className="stbody">
      <div className="superbook">
        <div className="superbook__pg-shadow" />
        <div className="superbook__pg" />
        <div className="superbook__pg superbook__pg--2" />
        <div className="superbook__pg superbook__pg--3" />
        <div className="superbook__pg superbook__pg--4" />
        <div className="superbook__pg superbook__pg--5" />
      </div>
    </div>
  )
}

export default Spinner
