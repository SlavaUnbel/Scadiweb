import '../../styles/not-found.scss';

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { notFound } from '../../utils/constants';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className="not-found__container">
        <img src={notFound} alt="" draggable={false} />

        <div className="content-wrapper">
          <h1>Oops!</h1>

          <p>There is no page you are looking for.</p>

          <div className="link">
            <Link to="/">Return to homepage</Link>
          </div>

          <div className="link">
            <span onClick={() => window.history.back()}>Go back</span>
          </div>
        </div>
      </div>
    );
  }
}
