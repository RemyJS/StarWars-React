import React from 'react'

import trap from '../../assets/img/trap.png';
import './error-msg.scss';

export default function ErrorMsg() {
  return (
    <div className='errormsg'>
      <h3>boom!</h3>
      <img src={trap} alt="error"/>
      <div>We have some problems...</div>
    </div>
  )
}
