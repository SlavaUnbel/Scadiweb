import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../../../redux/reducers/cartReducer';
import { IState } from '../../../../../redux/reducers/rootReducer';
import CartDetailsButtons from './cartDetailsButtons/CartDetailsButtons';
import CartDetailsHeader from './cartDetailsHeader/CartDetailsHeader';
import CartDetailsItemInfo from './cartDetailsItemInfo/CartDetailsItemInfo';
import CartDetailsItemQuantity from './cartDetailsItemQuantity/CartDetailsItemQuantity';
import CartDetailsTotal from './cartDetailsTotal/CartDetailsTotal';

interface Props {
  dialogOpened: boolean;
  chosenCurrency: ProductCurrency;
  products: IProductInCart[];
  setTotalPrice: (total: number) => void;
  setTotalItems: (total: number) => void;
}

class CartDetails extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { products, chosenCurrency, setTotalPrice, setTotalItems } =
      this.props;
    const { label } = chosenCurrency;
    const prices = products
      .map((item) =>
        item.product.prices.find((price) => price.currency.label === label)
      )
      .map((item) => item?.amount);

    if (
      prevProps.products !== products ||
      prevProps.chosenCurrency !== chosenCurrency
    ) {
      let total = 0;
      for (let index = 0; index < products.length; index++) {
        const quantity = products[index].quantity;
        const position = prices[index];
        if (!position) return;
        total += position * quantity;
      }

      setTotalItems(products.length);
      setTotalPrice(total);
    }
  }

  render() {
    const { dialogOpened, products } = this.props;

    return (
      <div className={`cart-wrapper ${dialogOpened ? "cart-opened" : ""}`}>
        <CartDetailsHeader />

        <div className="cart-items">
          {products.map((item, idx) => {
            const { product } = item;

            return item.quantity !== 0 ? (
              <div className="cart-item" key={`${product.id}-${idx}`}>
                <CartDetailsItemInfo item={item} />

                <CartDetailsItemQuantity item={item} idx={idx} />

                <div className="img-wrapper">
                  <Link to={`/details/${product.name}`}>
                    <img
                      src={item.product.gallery[0]}
                      alt=""
                      className="item-image"
                      draggable={false}
                    />
                  </Link>
                </div>
              </div>
            ) : null;
          })}
        </div>

        <CartDetailsTotal />

        <CartDetailsButtons />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  dialogOpened: state.dialog.dialogOpened,
  chosenCurrency: state.currency.chosenCurrency,
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTotalItems: bindActionCreators(cartActions.totalItems.set, dispatch),
  setTotalPrice: bindActionCreators(cartActions.totalPrice.set, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);
