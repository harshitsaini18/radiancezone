import React from 'react'
import { NavLink } from 'react-router-dom'

const NewNav = () => {
  const navigationOptions = [
    {
      name: 'home',
      color: '#5B37B7',
    },
    {
      name: 'submit',
      color: '#C9379D',
    },
    {
      name: 'analysis',
      color: '#E6A919',
    },
  ]

  function handleClick(e) {
    console.log(e.target.className)

    // // retrieve the option described the Navlink element
    const name = e.target.textContent.trim().toLowerCase()
    // // find in the array the object with the matching name
    // // store a reference to its color
    const { color } = navigationOptions.find((item) => item.name === name)
    console.log(color, name)
    // // retrieve the custom property for the --hover-c property, to make it so that the properties are updated only when necessary
    const style = window.getComputedStyle(e.target)
    const hoverColor = style.getPropertyValue('--hover-c')
    // // if the two don't match, update the custom property to show the hue with the text and the semi transparent background
    if (color !== hoverColor) {
      e.target.style.setProperty('--hover-bg', `${color}20`)
      e.target.style.setProperty('--hover-c', color)
    }

    // // apply the class of active to animate the svg an show the span element
    // this.classList.add('active');
    // // // change the color of the background of the application to match
    // // document.querySelector('body').style.background = color;
  }

  return (
    <div className="tbbody">
      <nav className="mynavbar">
        <NavLink
          className="mynavlink"
          activeClassName="active"
          onClick={handleClick}
          to="/"
        >
          <div>
            <i class="fa-regular fa-house-chimney"></i>
          </div>
          <span>Home</span>
        </NavLink>
        <NavLink
          className="mynavlink"
          activeClassName="active"
          onClick={handleClick}
          to="/submit"
        >
          <div>
            <i class="fa-light fa-chart-network"></i>
          </div>
          <span>Submit</span>
        </NavLink>
        <NavLink
          className="mynavlink"
          activeClassName="active"
          onClick={handleClick}
          to="/analysis"
        >
          <div>
            <i class="fa-duotone fa-puzzle"></i>
          </div>
          <span>Analysis</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default NewNav
