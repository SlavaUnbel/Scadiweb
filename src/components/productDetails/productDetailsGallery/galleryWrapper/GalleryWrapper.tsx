import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { productDetailsActions } from '../../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../../redux/reducers/rootReducer';

interface Props {
  currentProduct: IProduct | null;
  currentPage: number;
  itemsPerPage: number;
  incPage: () => void;
  decPage: () => void;
  children?: JSX.Element[];
}

interface State {
  disabledDec: boolean;
  disabledInc: boolean;
}

class GalleryWrapper extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getGalleryLength = this.getGalleryLength.bind(this);
    this.state = {
      disabledDec: true,
      disabledInc: false,
    };
  }

  getGalleryLength(prod: IProduct | null) {
    return !prod ? 0 : prod.gallery.length;
  }

  componentDidUpdate(prevProps: Props) {
    const { currentProduct, currentPage, itemsPerPage } = this.props;
    const lastPage = Math.ceil(
      this.getGalleryLength(currentProduct) / itemsPerPage
    );
    if (prevProps.currentPage !== currentPage) {
      if (lastPage === currentPage) {
        this.setState({ disabledInc: true, disabledDec: false });
      } else if (currentPage === 1) {
        this.setState({ disabledInc: false, disabledDec: true });
      } else {
        this.setState({ disabledInc: false, disabledDec: false });
      }
    }
  }

  render() {
    const { currentProduct, itemsPerPage, incPage, decPage, children } =
      this.props;
    const { disabledInc, disabledDec } = this.state;

    return (
      <div className="gallery-wrapper">
        {this.getGalleryLength(currentProduct) > itemsPerPage ? (
          <>
            <button
              className="arrow back"
              onClick={decPage}
              disabled={disabledDec}
            >
              <span className="up" />
            </button>

            <div className="items-wrapper">{children}</div>

            <button
              className="arrow forward"
              onClick={incPage}
              disabled={disabledInc}
            >
              <span className="down" />
            </button>
          </>
        ) : (
          <div className="items-wrapper">{children}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currentProduct: state.productDetails.currentProduct,
  currentPage: state.productDetails.currentGalleryPage,
  itemsPerPage: state.productDetails.galleryItemsPerPage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  incPage: bindActionCreators(
    productDetailsActions.currentGalleryPage.inc,
    dispatch
  ),
  decPage: bindActionCreators(
    productDetailsActions.currentGalleryPage.dec,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryWrapper);
