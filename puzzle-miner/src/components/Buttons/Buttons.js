import React from 'react';
import './buttons.css';

export default function Buttons() {
  return (
    <div className='frame'>
      <div className='north'>
        <i class='fas fa-arrow-up fa-3x'></i>
      </div>
      <div className='east'>
        {' '}
        <i class='fas fa-arrow-right fa-3x'></i>
      </div>
      <div className='south'>
        <i class='fas fa-arrow-down fa-3x'></i>
      </div>
      <div className='west'>
        {' '}
        <i class='fas fa-arrow-left fa-3x'></i>
      </div>
    </div>
  );
}
