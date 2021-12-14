import '../../styles/modal.scss';

import React, { PureComponent } from 'react';

interface Props {
  modalOpened: boolean;
  children: JSX.Element;
}

export default class ModalWrapper extends PureComponent<Props> {
  render() {
    const { modalOpened } = this.props;

    return (
      <>
        {modalOpened && (
          <div className="modal-window">
            <div className="modal-content">{this.props.children}</div>
          </div>
        )}
      </>
    );
  }
}
