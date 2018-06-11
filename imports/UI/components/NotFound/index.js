import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="box-view">
    <div className="box-view__box">
      <h1>Page not found</h1>
      <p>We cannot find this page</p>
      <Link to="/">
        <button className="button button_link">Home</button>
      </Link>
    </div>
  </div>
);