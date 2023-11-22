import React from 'react';

const CardComponent = ({ title, content }) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 home_card">
        <div className="card-header fw-bold">{title}</div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;