import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { dialogActions } from '../../../redux/reducers/dialogReducer';
import { productDetailsActions } from '../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../redux/reducers/rootReducer';
import { Icons } from '../../../utils/constants';

interface Props {
  product: IProduct;
  chosenCurrency: ProductCurrency;

  products: IProductInCart[];
  setCartItems: (products: IProductInCart[]) => void;

  setModalOpened: (opened: boolean) => void;
  setChosenProduct: (product: IProduct | null) => void;
}

interface State {
  hovered: boolean;
  modalOpened: boolean;
  inCart: boolean;
}

class Product extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.state = {
      hovered: false,
      modalOpened: false,
      inCart: false,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { products } = this.props;

    if (prevProps.products.length - products.length === 1)
      this.setState({ inCart: false });
  }

  mouseEnter() {
    this.setState({ hovered: true });
  }

  mouseLeave() {
    this.setState({ hovered: false });
  }

  handleAddToCart(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const {
      product,
      products,
      setCartItems,
      setModalOpened,
      setChosenProduct,
    } = this.props;
    const { inCart } = this.state;

    if (product.attributes.length > 0) {
      setModalOpened(true);
      setChosenProduct(product);
      this.setState({ modalOpened: true });
    } else {
      !inCart && setCartItems([...products, { product, quantity: 1 }]);
      this.setState({ inCart: true });
    }
  }

  render() {
    const { chosenCurrency } = this.props;
    const { symbol, label } = chosenCurrency;
    const { gallery, name, prices, inStock } = this.props.product;
    const { hovered } = this.state;
    const price = prices
      .find((price) => price.currency.label === label)
      ?.amount.toFixed(2);

    return (
      <div
        className={`product ${hovered ? "hovered" : ""}`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <Link to={`/details/${name}`}>
          <img
            src={gallery[0]}
            alt=""
            className={`product-image ${!inStock ? "out-of-stock" : ""}`}
            draggable={false}
          />

          {!inStock && <p className="out-of-stock-text">out of stock</p>}

          <p className="title">{name}</p>

          <p className="price">
            {symbol} {price}
          </p>
        </Link>

        {inStock && (
          <div
            className={`cart-button ${hovered ? "appeared" : ""}`}
            onClick={(e) => this.handleAddToCart(e)}
          >
            <img
              src={Icons.whiteCart}
              alt=""
              className="cart-icon"
              draggable={false}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
  chosenCurrency: state.currency.chosenCurrency,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setModalOpened: bindActionCreators(
    dialogActions.opened.setAttributesModal,
    dispatch
  ),
  setCartItems: bindActionCreators(cartActions.products.set, dispatch),
  setChosenProduct: bindActionCreators(
    productDetailsActions.currentProduct.set,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
