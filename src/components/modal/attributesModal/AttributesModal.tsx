import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { dialogActions } from '../../../redux/reducers/dialogReducer';
import { productDetailsActions } from '../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../redux/reducers/rootReducer';
import ModalWrapper from '../ModalWrapper';
import AttributeValue from './attributeValue/AttributeValue';

interface Props {
  product: IProduct | null;
  setChosenProduct: (chosen: IProduct | null) => void;
  addProduct: (product: IProductInCart) => void;

  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;

  selectedAttributes: ProductAttributesInCart[];
  clearAttributes: () => void;
}

class AttributesModal extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.proceed = this.proceed.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  proceed() {
    const {
      product,
      setChosenProduct,
      addProduct,
      selectedAttributes,
      clearAttributes,
    } = this.props;
    if (!product || selectedAttributes.length !== product.attributes.length)
      return;

    addProduct({ product, quantity: 1, selectedAttributes });
    clearAttributes();
    setChosenProduct(null);
    this.closeModal();
  }

  closeModal() {
    const { setModalOpened } = this.props;
    setModalOpened(false);
  }

  render() {
    const { product, modalOpened } = this.props;

    return (
      <ModalWrapper modalOpened={modalOpened}>
        <>
          <div className="modal-title">Select Suitable Attributes</div>

          <div className="attributes-wrapper">
            {product?.attributes.map((attr) => (
              <div className="attribute-name" key={attr.name}>
                <span className="label">{attr.name}: </span>

                <div className="attribute">
                  {attr.items.map((item, idx) => (
                    <AttributeValue
                      key={idx}
                      idx={idx}
                      item={item}
                      attr={attr}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="button-wrapper">
            <button className="close-btn" onClick={this.closeModal}>
              close
            </button>

            <button className="proceed-btn" onClick={this.proceed}>
              proceed
            </button>
          </div>
        </>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  product: state.productDetails.currentProduct,
  selectedAttributes: state.productDetails.selectedAttributes,
  modalOpened: state.dialog.attributesModalOpened,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProduct: bindActionCreators(cartActions.products.add, dispatch),
  setChosenProduct: bindActionCreators(
    productDetailsActions.currentProduct.set,
    dispatch
  ),
  setModalOpened: bindActionCreators(
    dialogActions.opened.setAttributesModal,
    dispatch
  ),
  clearAttributes: bindActionCreators(
    productDetailsActions.selectedAttributes.clear,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributesModal);
