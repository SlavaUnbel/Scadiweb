import '../../styles/cart.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../../redux/reducers/rootReducer';
import withHeader from '../../utils/withHeader';
import CartHeader from './cartHeader/CartHeader';
import CartItemInfo from './cartItemInfo/CartItemInfo';
import CartItemQuantity from './cartItemQuantity/CartItemQuantity';

interface Props {
  products: IProductInCart[];
  dialogOpened: boolean;
}

class CartPage extends PureComponent<Props> {
  render() {
    const { products, dialogOpened } = this.props;

    return (
      <div className={`cart ${dialogOpened ? "dialog-opened" : ""}`}>
        <CartHeader />

        <div className="cart-items-wrapper">
          {products.map((item, idx) => {
            const { product } = item;
            const { gallery } = product;

            return (
              <div className="cart-items" key={`${product.id}-${idx}`}>
                <span className="separator" />

                <div className="cart-item">
                  <CartItemInfo item={item} />

                  <CartItemQuantity item={item} idx={idx} />

                  <div className="img-wrapper">
                    <img src={gallery[0]} alt="" draggable={false} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
  dialogOpened: state.dialog.dialogOpened,
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHeader(CartPage));
