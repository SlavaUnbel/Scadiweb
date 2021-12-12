import React, { createRef, PureComponent, RefObject } from 'react';

interface Props {
  selectedAttributes: ProductAttributesInCart[];
  idx: number;
  item: ProductItems;
  attr: ProductAttributes;
}

interface State {
  children: HTMLSpanElement[];
  ref: RefObject<HTMLSpanElement>;
}

export default class AttributeValue extends PureComponent<Props, State> {
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
    const { selectedAttributes, idx } = this.props;
    const { children } = this.state;

    const i = selectedAttributes.findIndex((el) => el.name === element.name);

    i > -1
      ? (selectedAttributes[i] = element)
      : selectedAttributes.push(element);

    children.forEach((item) => item?.classList?.remove("selected"));
    children[idx + 1]?.classList.add("selected");
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
