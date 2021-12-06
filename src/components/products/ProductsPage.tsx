import '../../styles/products.scss';

import React, { PureComponent } from 'react';

import { PRODUCTS } from '../../service/queries/products';
import withHeader from '../../utils/withHeader';
import withQuery from '../../utils/withQuery';
import Product from './product/Product';

interface Props {
  data: {
    category: {
      name: "all";
      products: ProductParams[];
    };
  };
}

interface State {
  active: string;
  chosenCurrency: string;
}

class ProductsPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: "All",
      chosenCurrency: "USD",
    };
  }

  changeCategory(active: string) {
    this.setState({ active });
  }

  render() {
    const { active, chosenCurrency } = this.state;

    return (
      <div className="products">
        <h2>Category: {active}</h2>

        <div className="products-wrapper">
          {this.props.data?.category?.products?.map((product) => (
            <Product
              key={product.name}
              product={product}
              chosenCurrency={chosenCurrency}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withQuery(withHeader(ProductsPage), PRODUCTS);
