import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { productDetailsActions } from '../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../redux/reducers/rootReducer';
import GalleryWrapper from './galleryWrapper/GalleryWrapper';

interface Props {
  currentProduct: IProduct | null;
  currentGalleryPage: number;
  galleryItemsPerPage: number;
  setCurrentImg: (current: string) => void;
}

class ProductDetailsGallery extends PureComponent<Props> {
  render() {
    const {
      currentProduct,
      currentGalleryPage,
      galleryItemsPerPage,
      setCurrentImg,
    } = this.props;

    return (
      <GalleryWrapper>
        {currentProduct?.gallery
          .slice(
            (currentGalleryPage - 1) * galleryItemsPerPage,
            currentGalleryPage * galleryItemsPerPage
          )
          .map((src) => (
            <div
              key={src}
              className="gallery-item"
              onClick={() => setCurrentImg(src)}
            >
              <img src={src} alt="" draggable={false} />
            </div>
          ))}
      </GalleryWrapper>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currentProduct: state.productDetails.currentProduct,
  currentGalleryPage: state.productDetails.currentGalleryPage,
  galleryItemsPerPage: state.productDetails.galleryItemsPerPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentImg: bindActionCreators(
    productDetailsActions.currentImg.set,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailsGallery);
