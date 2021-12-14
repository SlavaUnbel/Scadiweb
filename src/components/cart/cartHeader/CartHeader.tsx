import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { dialogActions } from '../../../redux/reducers/dialogReducer';
import { IState } from '../../../redux/reducers/rootReducer';

interface Props {
  chosenCurrency: string;
  totalPrice: number;
  setModalOpened: (opened: boolean) => void;
  setProcessingPayment: (processing: boolean) => void;
}

class CartHeader extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleOrder = this.handleOrder.bind(this);
  }

  handleOrder() {
    const { setModalOpened, setProcessingPayment } = this.props;
    setModalOpened(true);
    setTimeout(() => setProcessingPayment(false), 5000);
  }

  render() {
    const { totalPrice, chosenCurrency } = this.props;

    return (
      <div className="header">
        <h2>Cart</h2>

        <button onClick={this.handleOrder}>
          buy
          <div>
            <span className={chosenCurrency} /> {totalPrice}
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  chosenCurrency: state.currency.chosenCurrency,
  totalPrice: state.cart.totalPrice,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(CartHeader);
