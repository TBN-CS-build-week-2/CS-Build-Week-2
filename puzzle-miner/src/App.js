import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.js';
import Adventure from './components/Adventure.js';
//import Buttons from './components/Buttons'

function App() {
  // localStorage.removeItem('key');
  const [logedIn, setLogedIn] = useState(!!localStorage.getItem('key'));
  const [backendUrl] = useState('https://lambda-treasure-hunt.herokuapp.com');

  useEffect(() => {
    if (localStorage.getItem('key')) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }, []);

  function setLocalKey() {
    if (localStorage.getItem('key')) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }

  return (
    <div className='App'>
      {logedIn ? (
        <Adventure
          logedIn={logedIn}
          backendUrl={backendUrl}
          setLocalKey={setLocalKey}
        />
      ) : (
        <Login setLocalKey={setLocalKey} />
      )}
    </div>
  );
}

export default App;
