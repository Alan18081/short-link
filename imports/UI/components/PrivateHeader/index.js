import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const privateHeader = ({title}) => (
  <div className="private-header">
    <div className="container">
      <div className="private-header__content">
        <h1>{title}</h1>
        <button className="button button_link" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  </div>
);

privateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default privateHeader;

