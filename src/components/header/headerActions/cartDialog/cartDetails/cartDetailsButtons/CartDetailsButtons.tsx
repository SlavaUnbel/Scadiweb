import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IState } from '../../../../../../redux/reducers/rootReducer';

interface Props {
  products: IProductInCart[];
}

class CartDetailsButtons extends PureComponent<Props> {
  render() {
    const { products } = this.props;

    return (
      <div className="button-wrapper">
        <Link to="/cart">
          <button className="cart-btn">view bag</button>
        </Link>

        <button className="check-btn" disabled={products.length === 0}>
          check out
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailsButtons);
