import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IState } from '../../../redux/reducers/rootReducer';

interface Props {
  currentProduct: IProduct | null;
  currentImg: string;
}

class ProductDetailsCurrentImg extends PureComponent<Props> {
  render() {
    const { currentProduct, currentImg } = this.props;

    return (
      <div className="img-wrapper">
        <img
          src={currentImg}
          alt=""
          draggable={false}
          className={`product-image ${
            !currentProduct?.inStock ? "out-of-stock" : ""
          }`}
        />

        {!currentProduct?.inStock && (
          <p className="out-of-stock-text">out of stock</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currentProduct: state.productDetails.currentProduct,
  currentImg: state.productDetails.currentImg,
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsCurrentImg);
