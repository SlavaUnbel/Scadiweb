import React, { Component } from 'react';

import CartDialog from './cartDialog/CartDialog';
import CurrenciesPicker from './currenciesPicker/CurrenciesPicker';

export default class HeaderActions extends Component {
  render() {
    return (
      <div className="header-actions">
        <CurrenciesPicker />

        <CartDialog />
      </div>
    );
  }
}
