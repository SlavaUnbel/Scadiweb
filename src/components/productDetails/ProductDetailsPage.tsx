import '../../styles/product-details.scss';

import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { productDetailsActions } from '../../redux/reducers/productDetailsReucer';
import { PRODUCTS } from '../../service/queries/products';
import withHeader from '../../utils/withHeader';
import withQuery from '../../utils/withQuery';
import ProductDetailsCurrentImg from './productDetailsCurrentImg/ProductDetailsCurrentImg';
import ProductDetailsGallery from './productDetailsGallery/ProductDetailsGallery';
import ProductDetailsInfo from './productDetailsInfo/ProductDetailsInfo';

interface Props extends IWithLoading {
  data: {
    category: {
      name: "all";
      products: IProduct[];
    };
  };

  setCurrentProduct: (current: IProduct | null) => void;
  setCurrentImg: (current: string) => void;
}

interface State {
  descRef: RefObject<HTMLDivElement>;
}

class ProductDetailsPage extends PureComponent<Props, State> {
  state: Readonly<State> = {
    descRef: createRef<HTMLDivElement>(),
  };

  componentDidMount() {
    const { loading, setCurrentProduct, setCurrentImg } = this.props;
    const { products } = this.props.data.category;
    const { descRef } = this.state;

    const path = window.location.pathname;
    const name = decodeURIComponent(path.slice(path.lastIndexOf("/") + 1));
    const current = products.find((prod) => prod.name === name);
    if (!loading && current) {
      setCurrentProduct(current);
      setCurrentImg(current.gallery[0]);
    }

    setTimeout(() => {
      if (descRef.current && current)
        descRef.current.innerHTML = current.description;
    }, 0);
  }

  render() {
    const { descRef } = this.state;

    return (
      <div className="product-details">
        <ProductDetailsGallery />

        <ProductDetailsCurrentImg />

        <ProductDetailsInfo descRef={descRef} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentProduct: bindActionCreators(
    productDetailsActions.currentProduct.set,
    dispatch
  ),
  setCurrentImg: bindActionCreators(
    productDetailsActions.currentImg.set,
    dispatch
  ),
});

const ProductDetails_Redux_Connected = connect(
  null,
  mapDispatchToProps
)(withHeader(ProductDetailsPage));

export default withQuery(ProductDetails_Redux_Connected, PRODUCTS);
