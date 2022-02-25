import React from 'react'
import { NavLink } from 'react-router-dom'

const NewNav = () => {

  // const [homeClass, setHomeClass] = useState("active");
  // const [analysis, setAnalysis] = useState("");
  // const [submit, setSubmit] = useState('');

  const navigationOptions = [
    {
      name: 'home',
      color: '#5B37B7'
    },
    {
      name: 'submit',
      color: '#C9379D'
    },
    {
      name: 'analysis',
      color: '#E6A919'
    }
  ];


  function handleClick(e) {
    console.log(e.target.className);
    // setHomeClass("");
    // setAnalysis("");
    // setSubmit("");
    // let className = e.target.className;

    // if (className == "home") {
    //   setHomeClass("active");
    // }
    // if(className == "analysis"){
    //   setAnalysis("active");
    // }
    // if(className == "submit"){
    //   setSubmit("active");
    // }

    // prevent the default behavior, but most importantly remove the class of .active from those elements with it
    // e.preventDefault();
    // Navlinks.forEach(Navlink => {
    //   if (Navlink.classList.contains('active')) {
    //     Navlink.classList.remove('active');
    //   }
    // });
  
    // // retrieve the option described the Navlink element
    const name = e.target.textContent.trim().toLowerCase();
    // // find in the array the object with the matching name
    // // store a reference to its color
    const { color } = navigationOptions.find(item => item.name === name);
    console.log(color,name);
    // // retrieve the custom property for the --hover-c property, to make it so that the properties are updated only when necessary
    const style = window.getComputedStyle(e.target);
    const hoverColor = style.getPropertyValue('--hover-c');
    // // if the two don't match, update the custom property to show the hue with the text and the semi transparent background
    if (color !== hoverColor) {
      e.target.style.setProperty('--hover-bg', `${color}20`);
      e.target.style.setProperty('--hover-c', color);
    }
  
    // // apply the class of active to animate the svg an show the span element
    // this.classList.add('active');
    // // // change the color of the background of the application to match
    // // document.querySelector('body').style.background = color;
  }
  
  


  return (
    <div className='tbbody'>
      
<nav className='mynavbar'>
  <NavLink className="mynavlink" activeClassName="active" onClick={handleClick} to="/">
  
  <div><i class="fa-regular fa-house-chimney"></i></div>
    <span>
      Home
    </span>
  </NavLink>
  <NavLink className="mynavlink" activeClassName="active" onClick={handleClick} to="/submit">
    <div><i class="fa-light fa-chart-network"></i></div>
    <span>
      Submit
    </span>
  </NavLink>
  <NavLink className="mynavlink" activeClassName="active" onClick={handleClick} to="/analysis">
    <div><i class="fa-duotone fa-puzzle"></i></div>
    <span>
      Analysis
    </span>
  </NavLink>
  {/* <NavLink onClick={handleClick} to="/">
    <svg viewBox="0 0 100 100">
      <g transform="translate(5 5) scale(0.9 0.9)">
        <circle cx={50} cy={35} r={18} stroke="currentColor" strokeWidth={10} fill="none" />
        <rect x={15} y={75} width={70} height={50} rx={25} stroke="currentColor" strokeWidth={10} fill="none" />
      </g>
    </svg>
    <span>
      Download
    </span>
  </NavLink> */}
</nav>

    </div>
  )
}

export default NewNav   