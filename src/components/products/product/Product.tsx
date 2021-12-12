import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { dialogActions } from '../../../redux/reducers/dialogReducer';
import { IState } from '../../../redux/reducers/rootReducer';
import { Icons } from '../../../utils/constants';

interface Props {
  product: IProduct;
  chosenCurrency: string;

  products: IProductInCart[];
  setCartItems: (products: IProductInCart[]) => void;

  setModalOpened: (opened: boolean) => void;
  chooseProduct: (product: IProduct) => void;
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
    this.redirectToPDP = this.redirectToPDP.bind(this);
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
    const { product, products, setCartItems, setModalOpened, chooseProduct } =
      this.props;
    const { inCart } = this.state;
    e.stopPropagation();

    if (product.attributes.length > 0) {
      setModalOpened(true);
      chooseProduct(product);
      this.setState({ modalOpened: true });
    } else {
      !inCart && setCartItems([...products, { product, quantity: 1 }]);
      this.setState({ inCart: true });
    }
  }

  redirectToPDP(item: string, exists: boolean) {
    if (!exists) return;
    const params = new URLSearchParams();
    params.set("product", item);
    window.history.replaceState(
      {},
      "",
      decodeURIComponent(`/details?${params}`)
    );
  }

  render() {
    const {
      chosenCurrency,
      product: { gallery, name, prices, inStock },
    } = this.props;
    const { hovered } = this.state;

    return (
      <>
        <div
          className={`product ${hovered ? "hovered" : ""}`}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          onClick={() => this.redirectToPDP(name, inStock)}
        >
          <img
            src={gallery[0]}
            alt=""
            className={`product-image ${!inStock ? "out-of-stock" : ""}`}
            draggable={false}
          />

          {!inStock && <p className="out-of-stock-text">out of stock</p>}

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

          <p className="title">{name}</p>

          <p className="price">
            <span className={chosenCurrency} />

            {prices.find((price) => price.currency === chosenCurrency)?.amount}
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setModalOpened: bindActionCreators(dialogActions.opened.setModal, dispatch),
  setCartItems: bindActionCreators(cartActions.products.set, dispatch),
  chooseProduct: bindActionCreators(dialogActions.product.choose, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
