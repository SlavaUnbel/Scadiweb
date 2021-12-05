import '../../styles/header.scss';

import React, { Component } from 'react';

import { brandIcon } from '../../utils/constants';
import Categories from './categories/Categories';
import HeaderActions from './headerActions/HeaderActions';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Categories />

        <img className="brand" src={brandIcon} alt="" />

        <HeaderActions />
      </header>
    );
  }
}
