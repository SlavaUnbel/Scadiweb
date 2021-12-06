import React, { PureComponent } from 'react';

import { whiteCartIcon } from '../../../utils/constants';

interface Props {
  product: ProductParams;
  chosenCurrency: string;
}

interface State {
  hovered: boolean;
}

export default class Product extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.state = {
      hovered: false,
    };
  }

  mouseEnter() {
    this.setState({ hovered: true });
  }

  mouseLeave() {
    this.setState({ hovered: false });
  }

  render() {
    const { gallery, name, prices, inStock } = this.props.product;
    const { chosenCurrency } = this.props;
    const { hovered } = this.state;

    return (
      <div
        className={`product ${hovered ? "hovered" : ""}`}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <img
          src={gallery[0]}
          alt=""
          className={`product-image ${!inStock ? "out-of-stock" : ""}`}
        />

        {!inStock && <p className="out-of-stock-text">out of stock</p>}

        {inStock && (
          <div className={`cart-button ${hovered ? "appeared" : ""}`}>
            <img src={whiteCartIcon} alt="" className="cart-icon" />
          </div>
        )}

        <p className="title">{name}</p>

        <p className="price">
          <span className={chosenCurrency} />

          {prices.find((price) => price.currency === chosenCurrency)?.amount}
        </p>
      </div>
    );
  }
}
