import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { dialogActions } from '../../../../redux/reducers/dialogReducer';
import { IState } from '../../../../redux/reducers/rootReducer';
import { cartIcon } from '../../../../utils/constants';

interface Props {
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

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(e: any) {
    !this.state.wrapperRef.current?.contains(e.target) &&
      this.props.openCloseDialog(false);
  }

  render() {
    const { dialogOpened, openCloseDialog } = this.props;
    const { wrapperRef } = this.state;

    return (
      <div className="cart-dialog" ref={wrapperRef}>
        <img
          className="cart-icon"
          src={cartIcon}
          alt=""
          onClick={() => openCloseDialog(!dialogOpened)}
          draggable={false}
        />

        <div className={`cart ${dialogOpened ? "cart-opened" : ""}`}>
          <h3>My Bag</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  dialogOpened: state.dialog.dialogOpened,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openCloseDialog: bindActionCreators(dialogActions.dialogOpened.set, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDialog);
