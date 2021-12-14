import '../../styles/loader.scss';

import React, { PureComponent } from 'react';

import { loader } from '../../utils/constants';

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="loader">
        <img src={loader} alt="" draggable={false} />
      </div>
    );
  }
}
