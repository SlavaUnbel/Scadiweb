import React, { PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { productDetailsActions } from '../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../redux/reducers/rootReducer';
import AttributeValue from '../../attributesModal/attributeValue/AttributeValue';

interface Props {
  product: IProduct | null;
  addProduct: (product: IProductInCart) => void;

  chosenCurrency: string;

  selectedAttributes: ProductAttributesInCart[];
  clearAttributes: () => void;

  descRef: RefObject<HTMLDivElement>;
}

class ProductDetailsInfo extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAttributes();
  }

  addToCart() {
    const { product, addProduct, selectedAttributes } = this.props;
    if (!product || selectedAttributes.length !== product.attributes.length)
      return;

    addProduct({ product, quantity: 1, selectedAttributes });
  }

  render() {
    const { product, chosenCurrency, descRef } = this.props;
    const price = product?.prices.find(
      (price) => price.currency === chosenCurrency
    );

    return (
      <div className="product-details-wrapper">
        <div className="product-brand">{product?.brand}</div>

        <div className="product-name">{product?.name}</div>

        {product?.attributes.map((attr) => (
          <div key={attr.id} className="product-attributes">
            <span className="label">{attr.name}:</span>

            <div className="attribute">
              {attr.items.map((item, idx) => (
                <AttributeValue key={idx} idx={idx} item={item} attr={attr} />
              ))}
            </div>
          </div>
        ))}

        <div className="product-price">
          <span className="label">price:</span>

          <div className="amount">
            <span className={chosenCurrency} /> {price?.amount}
          </div>
        </div>

        <button className="add-to-cart" onClick={this.addToCart}>
          add to cart
        </button>

        <div className="product-description" ref={descRef} />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  product: state.productDetails.currentProduct,
  chosenCurrency: state.currency.chosenCurrency,
  selectedAttributes: state.productDetails.selectedAttributes,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProduct: bindActionCreators(cartActions.products.add, dispatch),
  clearAttributes: bindActionCreators(
    productDetailsActions.selectedAttributes.clear,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsInfo);
