import '../../../styles/modal.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import { cartActions } from '../../../redux/reducers/cartReducer';
import { dialogActions } from '../../../redux/reducers/dialogReducer';
import { IState } from '../../../redux/reducers/rootReducer';
import Loader from '../../loader/Loader';
import ModalWrapper from '../ModalWrapper';

interface Props {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;

  processingPayment: boolean;
  setProcessingPayment: (processing: boolean) => void;

  clearCart: () => void;
}

class PaymentModal extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFinish = this.handleFinish.bind(this);
  }

  handleFinish() {
    const { setModalOpened, setProcessingPayment, clearCart } = this.props;
    setModalOpened(false);
    setProcessingPayment(true);
    clearCart();
  }

  render() {
    const { modalOpened, processingPayment } = this.props;

    return (
      <ModalWrapper modalOpened={modalOpened}>
        <>
          <div className="modal-title">
            {processingPayment
              ? "Please, be patient and wait till your order is resolved..."
              : "The payment was successful. Enjoy your purchase!"}
          </div>

          {processingPayment ? (
            <Loader />
          ) : (
            <Link to="/">
              <button onClick={this.handleFinish}>visit homepage</button>
            </Link>
          )}
        </>
      </ModalWrapper>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  modalOpened: state.dialog.paymentModalOpened,
  processingPayment: state.dialog.processingPayment,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setModalOpened: bindActionCreators(
    dialogActions.opened.setPaymentModal,
    dispatch
  ),
  setProcessingPayment: bindActionCreators(
    dialogActions.payment.changeStatus,
    dispatch
  ),
  clearCart: bindActionCreators(cartActions.products.clear, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
