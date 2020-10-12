import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

export default function header() {
  return (
    <div className="header">
      <h2 className="header__logo"><Link to='/'>Star Wars</Link></h2>
      <ul className="header__list">
        <li className="header__list_item">
          <Link to="/people/">People</Link>
        </li>
        <li className="header__list_item">
          <Link to="/planets/">Planets</Link>
        </li>
        <li className="header__list_item">
          <Link to="/starships/">Starships</Link>
        </li>
      </ul>
    </div>
  );
}
