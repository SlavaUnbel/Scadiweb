import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { currencyActions } from '../../../../redux/reducers/currencyReducer';
import { IState } from '../../../../redux/reducers/rootReducer';
import { CURRENCIES } from '../../../../service/queries/currencies';
import { expandIcon } from '../../../../utils/constants';
import withQuery from '../../../../utils/withQuery';

interface Props {
  data: {
    currencies: string[];
  };
  chosenCurrency: string;
  changeCurrency: (currency: string) => void;
}

interface State {
  currenciesDialogOpened: boolean;
  wrapperRef: RefObject<HTMLDivElement>;
}

class CurrenciesPicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.openCloseCurrenciesDialog = this.openCloseCurrenciesDialog.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      currenciesDialogOpened: false,
      wrapperRef: createRef<HTMLDivElement>(),
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: any) {
    this.state.wrapperRef.current &&
      !this.state.wrapperRef.current.contains(e.target) &&
      this.openCloseCurrenciesDialog(false);
  }

  openCloseCurrenciesDialog(currenciesDialogOpened: boolean) {
    this.setState({ currenciesDialogOpened });
  }

  render() {
    const { currenciesDialogOpened, wrapperRef } = this.state;
    const { chosenCurrency, changeCurrency } = this.props;

    return (
      <div
        className="currency"
        onClick={() => this.openCloseCurrenciesDialog(!currenciesDialogOpened)}
        ref={wrapperRef}
      >
        <span className={chosenCurrency} />

        <img
          className={`expand ${
            currenciesDialogOpened ? "currencies-opened" : ""
          }`}
          src={expandIcon}
          alt=""
          draggable={false}
        />

        <ul className={currenciesDialogOpened ? "currencies-opened" : ""}>
          {this.props.data?.currencies.map((currency) => (
            <li key={currency} onClick={() => changeCurrency(currency)}>
              <span className={currency} />
              {currency}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  chosenCurrency: state.currency.chosenCurrency,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCurrency: bindActionCreators(
    currencyActions.chosenCurrency.set,
    dispatch
  ),
});

const CurrenciesPicker_Redux_Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesPicker);

export default withQuery(CurrenciesPicker_Redux_Connected, CURRENCIES);
