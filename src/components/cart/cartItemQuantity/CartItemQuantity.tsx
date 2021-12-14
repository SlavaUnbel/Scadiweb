import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { IState } from '../../../redux/reducers/rootReducer';

interface Props {
  item: IProductInCart;
  idx: number;

  products: IProductInCart[];
  setProducts: (products: IProductInCart[]) => void;
  changeQuantity: (id: string, action: "add" | "remove") => void;
}

class CartItemQuantity extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAdd(id: string) {
    const { changeQuantity } = this.props;
    changeQuantity(id, "add");
  }

  handleRemove(id: string) {
    const { quantity } = this.props.item;
    const { item, products, setProducts, changeQuantity } = this.props;

    if (quantity === 1) {
      setProducts(products.filter((prod) => item !== prod));
    } else {
      changeQuantity(id, "remove");
    }
  }

  render() {
    const { product, quantity } = this.props.item;
    const { idx } = this.props;

    return (
      <div className="item-quantity">
        <button
          className="add"
          onClick={() => this.handleAdd(`${product.id}-${idx}`)}
        >
          +
        </button>

        {quantity}

        <button
          className="remove"
          onClick={() => this.handleRemove(`${product.id}-${idx}`)}
        >
          -
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProducts: bindActionCreators(cartActions.products.set, dispatch),
  changeQuantity: bindActionCreators(
    cartActions.products.changeQuantity,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemQuantity);
