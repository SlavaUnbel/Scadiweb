import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../../../../redux/reducers/cartReducer';
import { IState } from '../../../../../../redux/reducers/rootReducer';

interface Props {
  products: IProductInCart[];
  totalPrice: number;
  chosenCurrency: ProductCurrency;
  setTotalPrice: (total: number) => void;
}

class CartDetailsTotal extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { products, chosenCurrency, setTotalPrice } = this.props;
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

      setTotalPrice(+total.toFixed(2));
    }
  }

  render() {
    const { totalPrice, chosenCurrency } = this.props;
    const { symbol } = chosenCurrency;

    return (
      <div className="total">
        <p>Total:</p>

        <p className="amount">
          {symbol} {totalPrice}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
  totalPrice: state.cart.totalPrice,
  chosenCurrency: state.currency.chosenCurrency,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTotalPrice: bindActionCreators(cartActions.totalPrice.set, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailsTotal);
