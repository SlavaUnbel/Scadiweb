import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../../../../../../redux/reducers/rootReducer';

interface Props {
  item: IProductInCart;
  chosenCurrency: ProductCurrency;
}

class CartDetailsItemInfo extends PureComponent<Props> {
  render() {
    const { product, quantity, selectedAttributes } = this.props.item;
    const { chosenCurrency } = this.props;
    const { label, symbol } = chosenCurrency;
    const price = product.prices.find(
      (price) => price.currency.label === label
    )?.amount;

    return (
      <div className="cart-item-info">
        <div className="item-name">{product.name}</div>

        <div className="item-price">
          {symbol} {price && (price * quantity).toFixed(2)}
        </div>

        {selectedAttributes && (
          <div className="item-attributes">
            {selectedAttributes.map((attribute) => (
              <div className="attributes" key={attribute.id}>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetailsItemInfo);
