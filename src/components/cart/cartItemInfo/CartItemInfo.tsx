import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../../../redux/reducers/rootReducer';

interface Props {
  item: IProductInCart;
  chosenCurrency: string;
}

class CartItemInfo extends PureComponent<Props> {
  render() {
    const { chosenCurrency } = this.props;
    const { product, selectedAttributes } = this.props.item;
    const { brand, name, prices } = product;
    const price = prices.find(
      (price) => price.currency === chosenCurrency
    )?.amount;

    return (
      <div className="cart-item-info">
        <div className="cart-item-brand">{brand}</div>

        <div className="cart-item-name">{name}</div>

        <div className="cart-item-price">
          <span className={chosenCurrency} /> {price}
        </div>

        {selectedAttributes && (
          <div className="item-attributes">
            {selectedAttributes.map((attribute) => (
              <div className="cart-item-attributes" key={attribute.id}>
                <span>{attribute.name}: </span>

                <div
                  className="attribute-value"
                  style={
                    attribute.type === "swatch"
                      ? {
                          background: attribute.selected.value,
                          borderColor:
                            attribute.selected.value === "#FFFFFF"
                              ? "#000"
                              : attribute.selected.value,
                          color:
                            attribute.selected.value === "#FFFFFF"
                              ? "#000"
                              : "#FFF",
                        }
                      : {}
                  }
                >
                  {attribute.type === "swatch"
                    ? attribute.selected.displayValue
                    : attribute.selected.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  chosenCurrency: state.currency.chosenCurrency,
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CartItemInfo);
