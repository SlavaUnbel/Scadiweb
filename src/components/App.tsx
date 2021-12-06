import React, { PureComponent } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import ProductsPage from './products/ProductsPage';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </Router>
    );
  }
}
