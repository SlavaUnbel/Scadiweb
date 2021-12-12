import '../../styles/modal.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../redux/reducers/cartReducer';
import { dialogActions } from '../../redux/reducers/dialogReducer';
import { IState } from '../../redux/reducers/rootReducer';
import AttributeValue from './attributeValue/AttributeValue';

interface Props {
  products: IProductInCart[];
  setProducts: (products: IProductInCart[]) => void;

  product: IProduct;
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
}

interface State {
  selectedAttributes: ProductAttributesInCart[];
}

class AttributesModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.proceed = this.proceed.bind(this);
    this.state = {
      selectedAttributes: [],
    };
  }

  proceed() {
    const { products, setProducts, product, setModalOpened } = this.props;
    const { selectedAttributes } = this.state;

    setProducts([...products, { product, quantity: 1, selectedAttributes }]);
    this.setState({ selectedAttributes: [] });
    setModalOpened(false);
  }

  render() {
    const { product, modalOpened, setModalOpened } = this.props;
    const { selectedAttributes } = this.state;

    return (
      <>
        {modalOpened && (
          <div className="attributes-modal">
            <div className="modal-content">
              <div className="modal-title">Select Suitable Attributes</div>

              <div className="attributes">
                {product.attributes.map((attr) => (
                  <div className="attribute" key={attr.name}>
                    <span className="attribute-name">{attr.name}: </span>
                    {attr.items.map((item, idx) => (
                      <AttributeValue
                        key={idx}
                        selectedAttributes={selectedAttributes}
                        idx={idx}
                        item={item}
                        attr={attr}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="button-wrapper">
                <button
                  className="close-btn"
                  onClick={() => setModalOpened(false)}
                >
                  close
                </button>

                <button className="proceed-btn" onClick={this.proceed}>
                  proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProducts: bindActionCreators(cartActions.products.set, dispatch),
  setModalOpened: bindActionCreators(dialogActions.opened.setModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributesModal);
