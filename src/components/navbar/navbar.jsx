import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import imgOpen from "@assets/img/icon_nav/navigation.svg";
import imgClose from "@assets/img/icon_nav/navigation_close.svg";
import { items } from "./data.js";
import "./navbar.css"

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  const handNav = () => {
    setOpenNav(!openNav);
  }
  
  return(
    <div className={ openNav ? 'layoutNavbar' : 'layoutNavbarFalse'}>
      <img src={openNav ? imgClose : imgOpen} alt={openNav ? imgClose : imgOpen} onClick={handNav} className="imgNav"/>
      <div className="layoutTitle">
        <h3>SAOARS/UB</h3>
        <p>Database</p>
      </div>
      {items.map(({ url, imgBtn, text }) => (
        <NavLink to={url} className={({ isActive })=> (isActive ? 'layoutIconNavActive' : 'layoutIconNav')}>
          <img src={imgBtn} alt={imgBtn} />
          <p className={openNav ? null : 'titleNav'}>{text}</p>
        </NavLink>
      ))}
    </div>
  )
}