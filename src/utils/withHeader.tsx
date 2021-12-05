import React, { Component } from 'react';

import Header from '../components/header/Header';

export default function withHeader(component: any) {
  return class WithHeader extends Component {
    render() {
      return (
        <>
          <Header />

          {component}
        </>
      );
    }
  };
}
