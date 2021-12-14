import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class BrandIconWrapper extends PureComponent {
  render() {
    return window.location.pathname !== "/" ? (
      <Link to="/">{this.props.children}</Link>
    ) : (
      this.props.children
    );
  }
}
