import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Buttons from './Buttons/Buttons';

function Adventure(props) {
  const [currMap, setMap] = useState({});
  const [currInfo, setCurrInfo] = useState();

  useEffect(() => {
    const auth = `Token ${localStorage.getItem('key')}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      }
    };
    // console.log(options)
    axios.get(`${props.backendUrl}/api/adv/init/`, options).then(res => {
      setCurrInfo(res.data);
    });
  }, [props.logedIn, props.backendUrl]);

  return (
    <div className='adventure'>
      <button
        onClick={e => {
          e.preventDefault();
          props.setLocalKey();
          localStorage.removeItem('key');
        }}
      >
        Logout
      </button>
      <p>adventure</p>
      <Buttons />
    </div>
  );
}

export default Adventure;
