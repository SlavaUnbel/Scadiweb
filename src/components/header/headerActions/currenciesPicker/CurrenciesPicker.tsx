import '../../../../styles/currency.scss';

import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { currencyActions } from '../../../../redux/reducers/currencyReducer';
import { IState } from '../../../../redux/reducers/rootReducer';
import { CURRENCIES } from '../../../../service/queries/currencies';
import { Icons } from '../../../../utils/constants';
import withQuery from '../../../../utils/withQuery';

interface Props {
  data: {
    currencies: string[];
  };

  chosenCurrency: string;
  changeCurrency: (currency: string) => void;
}

interface State {
  opened: boolean;
  wrapperRef: RefObject<HTMLDivElement>;
}

class CurrenciesPicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggleCurrenciesDialog = this.toggleCurrenciesDialog.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      opened: false,
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
      this.toggleCurrenciesDialog(false);
  }

  toggleCurrenciesDialog(opened: boolean) {
    this.setState({ opened });
  }

  render() {
    const { opened, wrapperRef } = this.state;
    const { chosenCurrency, changeCurrency } = this.props;

    return (
      <div
        className="currency"
        onClick={() => this.toggleCurrenciesDialog(!opened)}
        ref={wrapperRef}
      >
        <span className={chosenCurrency} />

        <img
          className={`expand ${opened ? "currencies-opened" : ""}`}
          src={Icons.expand}
          alt=""
          draggable={false}
        />

        <ul className={opened ? "currencies-opened" : ""}>
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
