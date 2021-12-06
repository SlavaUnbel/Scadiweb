import React, { PureComponent } from 'react';

import Header from '../components/header/Header';

export default function withHeader(Component: Function) {
  return class WithHeader extends PureComponent {
    render() {
      return (
        <>
          <Header />

          <Component {...this.props} />
        </>
      );
    }
  };
}
