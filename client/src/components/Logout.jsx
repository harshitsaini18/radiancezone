import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Avatar, IconButton, Tooltip } from '@mui/material'
import Swal from 'sweetalert2'

const Logout = (props) => {
  const history = useNavigate()

  function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      color += `00${value.toString(16)}`.substr(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar() {
    let name = props.name.name
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    }
  }

  function logOut(e) {
    Swal.fire({
      title: 'Are you want to log out?',
      text: 'You are Log outing',
      icon: 'question',
      showCancelButton: 'No',
      confirmButtonText: 'Yes',
    }).then((willLogOut) => {
      // console.log(willLogOut);
      if (willLogOut.isConfirmed) {
        Swal.fire({
          title: 'Poof! You are log out successful',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        axios('/logout').then((res) => {
          console.log(res)
        })
        history('/',{replace:true})
      } else {
        Swal.fire('You are still Log in')
      }
    })
  }

  return (
    <>
      <Tooltip title="Log out" arrow>
        <IconButton onClick={logOut}>
          {
            props.name.picture?(<Avatar alt={props.name.name} src={props.name.picture} />): <Avatar {...stringAvatar()} />
          }
         
        </IconButton>
      </Tooltip>
    </>
  )
}

export default Logout
