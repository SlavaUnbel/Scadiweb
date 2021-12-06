import React, { createRef, PureComponent, RefObject } from 'react';

import { CURRENCIES } from '../../../../service/queries/currencies';
import { expandIcon } from '../../../../utils/constants';
import withQuery from '../../../../utils/withQuery';

interface Props {
  data: {
    currencies: string[];
  };
}

interface State {
  currentCurrency: string;
  currenciesDialogOpened: boolean;
  wrapperRef: RefObject<HTMLDivElement>;
}

class CurrenciesPicker extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.openCloseCurrenciesDialog = this.openCloseCurrenciesDialog.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      currentCurrency: "USD",
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

  handleChangeCurrency(currentCurrency: string) {
    this.setState({ currentCurrency, currenciesDialogOpened: false });
  }

  render() {
    const { currentCurrency, currenciesDialogOpened, wrapperRef } = this.state;

    return (
      <div
        className="currency"
        onClick={() => this.openCloseCurrenciesDialog(!currenciesDialogOpened)}
        ref={wrapperRef}
      >
        <span className={currentCurrency} />

        <img
          className={`expand ${
            currenciesDialogOpened ? "currencies-opened" : ""
          }`}
          src={expandIcon}
          alt=""
        />

        <ul className={currenciesDialogOpened ? "currencies-opened" : ""}>
          {this.props.data?.currencies.map((currency) => (
            <li
              key={currency}
              onClick={() => this.handleChangeCurrency(currency)}
            >
              <span className={currency} />
              {currency}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withQuery(CurrenciesPicker, CURRENCIES);
