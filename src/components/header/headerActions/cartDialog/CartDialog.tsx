import React, { createRef, PureComponent, RefObject } from 'react';

import { cartIcon } from '../../../../utils/constants';

interface State {
  cartOpened: boolean;
  wrapperRef: RefObject<HTMLDivElement>;
}

export default class CartDialog extends PureComponent<{}, State> {
  constructor(props: any) {
    super(props);
    this.openCloseCart = this.openCloseCart.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      cartOpened: false,
      wrapperRef: createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: any) {
    !this.state.wrapperRef.current?.contains(e.target) &&
      this.openCloseCart(false);
  }

  openCloseCart(cartOpened: boolean) {
    this.setState({ cartOpened });
  }

  render() {
    const { cartOpened, wrapperRef } = this.state;

    return (
      <div className="cart-dialog" ref={wrapperRef}>
        <img
          className="cart-icon"
          src={cartIcon}
          alt=""
          onClick={() => this.openCloseCart(!cartOpened)}
        />

        <div className={`cart ${cartOpened ? "cart-opened" : ""}`}>
          <h3>My Bag</h3>
        </div>
      </div>
    );
  }
}
