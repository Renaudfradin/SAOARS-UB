import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(params) {
  return(
    <div>
      <p>navbar</p>
      <Link to='/'>home</Link><br />
      <Link to='/characters'>characters</Link><br />
      <Link to='/banners'>banners</Link><br />
      <Link to='/weapons'>weapons</Link><br />
      <Link to='/equipements'>equipements</Link><br />
      <Link to='/imaginations'>imaginations</Link><br />
      <Link to='/abilitys'>abilitys</Link>
    </div>
  )
}