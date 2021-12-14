import React, { createRef, PureComponent, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { productDetailsActions } from '../../../../redux/reducers/productDetailsReucer';
import { IState } from '../../../../redux/reducers/rootReducer';

interface Props {
  idx: number;
  item: ProductItems;
  attr: ProductAttributes;

  currentProduct: IProduct | null;
  upsertAttributes: (attr: ProductAttributesInCart) => void;
}

interface State {
  children: HTMLSpanElement[];
  ref: RefObject<HTMLSpanElement>;
}

class AttributeValue extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.upsert = this.upsert.bind(this);
    this.state = {
      ref: createRef<HTMLSpanElement>(),
      children: [],
    };
  }

  componentDidMount() {
    const { ref } = this.state;
    this.setState({
      children: ref.current?.parentNode
        ?.childNodes as unknown as HTMLSpanElement[],
    });
  }

  upsert(element: ProductAttributesInCart) {
    const { idx, currentProduct, upsertAttributes } = this.props;
    const { children } = this.state;
    if (!currentProduct?.inStock) return;

    upsertAttributes(element);

    children.forEach((item) => item?.classList?.remove("selected"));
    children[idx]?.classList.add("selected");
  }

  render() {
    const { item, attr } = this.props;
    const { ref } = this.state;

    return (
      <span
        ref={ref}
        className="attribute-value"
        onClick={() => this.upsert({ ...attr, selected: item })}
      >
        {attr.type === "swatch" ? item.displayValue : item.value}
      </span>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  currentProduct: state.productDetails.currentProduct,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  upsertAttributes: bindActionCreators(
    productDetailsActions.selectedAttributes.upsert,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributeValue);
