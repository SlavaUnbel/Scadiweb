import React, { PureComponent } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import CartPage from './cart/CartPage';
import AttributesModal from './modal/attributesModal/AttributesModal';
import PaymentModal from './modal/paymentModal/PaymentModal';
import NotFound from './notFound/NotFound';
import ProductDetailsPage from './productDetails/ProductDetailsPage';
import ProductsPage from './products/ProductsPage';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />

          <Route path="/details/:product" element={<ProductDetailsPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <AttributesModal />

        <PaymentModal />
      </Router>
    );
  }
}
