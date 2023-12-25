import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={style.navbar}>
      <h2>Ashar</h2>
      <div className={style.option}>
        <Link className={style.link} to='/'>
          New Form
        </Link>
        <Link className={style.link} to='/form'>
          Forms
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
