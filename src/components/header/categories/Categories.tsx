import React, { PureComponent } from 'react';

import { CATEGORIES } from '../../../service/queries/categories';
import withQuery from '../../../utils/withQuery';

type Category = {
  name: string;
};

interface Props {
  data: {
    categories: Category[];
  };
}

interface State {
  active: string;
}

class Categories extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.toggleActive = this.toggleActive.bind(this);
    this.state = {
      active: "",
    };
  }

  toggleActive(active: string) {
    this.setState({ active });
  }

  render() {
    const { active } = this.state;

    return (
      <nav>
        {this.props.data?.categories?.map((category) => (
          <li
            key={category.name}
            className={active === category.name ? "active" : ""}
            onClick={() => this.toggleActive(category.name)}
          >
            {category.name}
          </li>
        ))}
      </nav>
    );
  }
}

export default withQuery(Categories, CATEGORIES);
