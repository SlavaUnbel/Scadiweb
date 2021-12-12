import React, { PureComponent } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import NotFound from './notFound/NotFound';
import ProductsPage from './products/ProductsPage';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<ProductsPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}
