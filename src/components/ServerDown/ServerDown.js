import './ServerDown.css';
import React from 'react';
import PropTypes from 'prop-types';
import image from '../../images/ServerDown.png';
export const ServerDown = ({ error }) => {
  return (
    <div className="server-down">
      {error && <h1 className="error">{error}</h1>}
      <img
        src={image}
        alt="Server is down, sailboat sails and the sun spelling out four oh four."
      />
    </div>
  );
};

ServerDown.propTypes = {
  error: PropTypes.string,
};
