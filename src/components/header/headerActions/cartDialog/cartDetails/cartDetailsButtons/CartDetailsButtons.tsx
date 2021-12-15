import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { dialogActions } from '../../../../../../redux/reducers/dialogReducer';
import { IState } from '../../../../../../redux/reducers/rootReducer';

interface Props {
  products: IProductInCart[];
  setDialogOpened: (opened: boolean) => void;
  setModalOpened: (opened: boolean) => void;
  setProcessingPayment: (processing: boolean) => void;
}

class CartDetailsButtons extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
  }

  handleCloseDialog() {
    const { setDialogOpened } = this.props;
    setDialogOpened(false);
  }

  handleOrder() {
    const { setModalOpened, setProcessingPayment } = this.props;
    setModalOpened(true);
    setTimeout(() => setProcessingPayment(false), 5000);
    this.handleCloseDialog();
  }

  render() {
    const { products } = this.props;
    const disabled = products.length === 0;

    return (
      <div className="button-wrapper">
        <button
          className="cart-btn"
          onClick={this.handleCloseDialog}
          disabled={disabled}
        >
          <Link to="/cart">view bag</Link>
        </button>

        <button
          className="check-btn"
          onClick={this.handleOrder}
          disabled={disabled}
        >
          check out
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDialogOpened: bindActionCreators(dialogActions.opened.setDialog, dispatch),
  setModalOpened: bindActionCreators(
    dialogActions.opened.setPaymentModal,
    dispatch
  ),
  setProcessingPayment: bindActionCreators(
    dialogActions.payment.changeStatus,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailsButtons);
