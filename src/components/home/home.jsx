import React from 'react';
import MainContentComponent from './main_content_component.jsx';
import './home.css';
import { isAdmin } from '../../api/UserHandler.jsx';

const HomePage = () => {
  return (
    <div className="container d-flex flex-column align-items-center text-center my-5">
      {isAdmin() ? (
        <div>
          <h2>Welcome Admin!</h2>
          <MainContentComponent />
        </div>
      ) : (
        <div>
          <h2>Welcome to SMA Atma Budika!</h2>
          <h2>Server Down, For Saving Money.</h2>
          <MainContentComponent />
        </div>
      )}
    </div>
  );
};

export default HomePage;