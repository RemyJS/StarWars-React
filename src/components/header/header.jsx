import React from 'react'

import './header.scss';

export default function header() {
  return (
    <div className='header'>
      <h2 className='header__logo'>Star Wars</h2>
      <ul className='header__list'>
        <li className='header__list_item'><a href="#">Peoples</a></li>
        <li className='header__list_item'><a href="#">Planets</a></li>
        <li className='header__list_item'><a href="#">Vehicles</a></li>
        <li className='header__list_item'><a href="#">Starships</a></li>
      </ul>
    </div>
  )
}
