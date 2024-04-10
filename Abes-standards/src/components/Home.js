import React from 'react';
import logo from '../assets/Rolling Stone.jpg'; // Make sure the path is correct
import LoginMenu from './LoginMenu.js';
const Home = () => {
  return (
    <div>
      <img src={logo} alt="Rolling Stone" style={{ maxWidth: '100%', height: 'auto' }} />
      <h1>Welcome to Abe's Standards Book Club!</h1>
      <LoginMenu />
    </div>
  );
};

export default Home;
