import React, {  useRef, useEffect } from 'react'
import gsap  from 'gsap';

const Lbtn = () => {
    let isChecked = false;

function onBtnDown() {
  const tl = gsap.timeline();
  tl.to("#rope-end", { duration: 0.2, y: 160 }, "start");
  tl.to("#rope", { duration: 0.2, morphSVG: "#rope-extended" }, "start");
}

function onBtnUp() {
  const tl = gsap.timeline();
  tl.to(
    "#rope",
    { duration: 0.4, morphSVG: "#rope-compressed", ease: "bounce.out" },
    "up"
  );
  tl.to(
    "#rope",
    { duration: 0.2, morphSVG: "#rope-original", ease: "bounce.out" },
    "down"
  );
  tl.to("#rope-end", { duration: 0.4, y: 90, ease: "bounce.out" }, "up");
  tl.to("#rope-end", { duration: 0.2, y: 120, ease: "bounce.out" }, "down");

  isChecked = !isChecked;

  let x = 0;
  let backgroundColor = "#827D96";
  let size = "100px";

  if (isChecked) {
    x = 160;
    backgroundColor = "#FFFFFF";
    size = "500px";
  }

  tl.to(".knob", { x, duration: 1 }, "up");
  tl.to(".ltop", { backgroundColor, duration: 1 }, "up");
  tl.to(".llight", { width: size, height: size, duration: 1 }, "up");
}

 const bttn = useRef();
 useEffect(() => {
  bttn.current.addEventListener("mousedown", onBtnDown);
  bttn.current.addEventListener("mouseup", onBtnUp);
}, []);

function toggleBtn() {
var light = document.getElementById("light");
  light.classList.toggle("on");
}

  return (
     <div className="lbtnContainer" >
  <svg className="svg" width={100} height={220} viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path id="rope" d="M50 0V130" stroke="#333842" strokeWidth={6} />
    <path id="rope-original" d="M50 0V130" stroke="black" strokeWidth={1} className="lhidden" />
    <path id="rope-extended" d="M50 0V170" stroke="black" strokeWidth={1} className="lhidden" />
    <path id="rope-compressed" d="M50.6794 99.5395C50.6794 99.5395 51.0304 93.3539 50.6794 89.416C49.698 78.405 40.6105 73.7631 41.2462 62.7267C42.1339 47.3139 63.6882 46.1634 64.4843 30.7456C65.1561 17.7347 50.6794 0.375 50.6794 0.375" stroke="black" strokeWidth={1} className="lhidden" />
    <path id="rope-end" d="M39.282 5.16623C39.9597 1.92197 42.8198 -0.402344 46.134 -0.402344H54.756C58.1211 -0.402344 61.01 1.99207 61.6344 5.29871L68.4328 41.2987C69.2468 45.6092 65.941 49.5977 61.5544 49.5977H38.6135C34.1717 49.5977 30.8531 45.5141 31.7614 41.1662L39.282 5.16623Z" transform="matrix(1,0,0,1,0,120)" fill="#3B2898" />
  </svg>
  <div className="lbtn no-highlight" ref={bttn} onClick={toggleBtn}>
    <div className="knob no-highlight">
      <div className="llight no-highlight" />
      <div className="ltop no-highlight" />
    </div>
  </div>
</div>
  )
}

export default Lbtn