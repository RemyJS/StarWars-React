import React from 'react';

import png from '../../assets/img/loading.png'
import './loading.scss';

export default function Loading() {
  const style = {
    height: '100px',
  }
  
  return (
    <div className='loading'>
      <img style={style} src={png} alt="loading"/>
    </div>
  )
}
