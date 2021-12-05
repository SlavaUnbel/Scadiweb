import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import CategoriesPage from './categories/CategoriesPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
        </Routes>
      </Router>
    );
  }
}
