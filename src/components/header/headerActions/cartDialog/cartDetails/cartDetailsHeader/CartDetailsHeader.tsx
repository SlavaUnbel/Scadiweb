import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../../../../redux/reducers/cartReducer';
import { IState } from '../../../../../../redux/reducers/rootReducer';

interface Props {
  products: IProductInCart[];
  totalItems: number;
  setTotalItems: (total: number) => void;
}

class CartDetailsHeader extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    const { products, setTotalItems } = this.props;

    if (prevProps.products !== products) {
      setTotalItems(products.length);
    }
  }

  render() {
    const { totalItems } = this.props;

    return (
      <div className="header">
        <h3>My Bag,</h3>

        <p>
          {totalItems} item{totalItems !== 1 && "s"}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
  totalItems: state.cart.totalItems,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTotalItems: bindActionCreators(cartActions.totalItems.set, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailsHeader);
