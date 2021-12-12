import '../../../../styles/cart-dialog.scss';

import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { dialogActions } from '../../../../redux/reducers/dialogReducer';
import { IState } from '../../../../redux/reducers/rootReducer';
import { Icons } from '../../../../utils/constants';
import CartDetails from './cartDetails/CartDetails';

interface Props {
  totalItems: number;
  dialogOpened: boolean;
  openCloseDialog: (opened: boolean) => void;
}

interface State {
  wrapperRef: RefObject<HTMLDivElement>;
}

class CartDialog extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      wrapperRef: createRef<HTMLDivElement>(),
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { totalItems, openCloseDialog } = this.props;
    if (prevProps.totalItems !== totalItems && totalItems === 0) {
      openCloseDialog(false);
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: any) {
    const { dialogOpened, openCloseDialog } = this.props;
    const { wrapperRef } = this.state;

    !wrapperRef.current?.contains(e.target) &&
      dialogOpened &&
      openCloseDialog(false);
  }

  render() {
    const { totalItems, dialogOpened, openCloseDialog } = this.props;
    const { wrapperRef } = this.state;

    return (
      <div className="cart-dialog" ref={wrapperRef}>
        <div onClick={() => openCloseDialog(!dialogOpened)}>
          <img
            className="cart-icon"
            src={Icons.cart}
            alt=""
            draggable={false}
          />

          {totalItems > 0 && (
            <span className="cart-badge">
              {totalItems < 10 ? totalItems : "9+"}
            </span>
          )}
        </div>

        <CartDetails />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  totalItems: state.cart.totalItems,
  dialogOpened: state.dialog.dialogOpened,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCloseDialog: bindActionCreators(dialogActions.opened.setDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog);
