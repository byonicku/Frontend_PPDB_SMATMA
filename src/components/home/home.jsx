import React from 'react';
import MainContentComponent from './main_content_component.jsx';
import './home.css';
import UserState from '../../constant/user_state.jsx'

const HomePage = ({ state }) => {
  return (
    <div className="container d-flex flex-column align-items-center text-center my-5">
      {state === UserState.ADMIN ? (
        <h2>Welcome Admin!</h2>
      ) : (
        <div>
          <h2>Welcome to SMA Atma Budika!</h2>
          <MainContentComponent />
        </div>
      )}
    </div>
  );
};

export default HomePage;