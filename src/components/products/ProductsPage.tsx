import '../../styles/products.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { productsActions } from '../../redux/reducers/productsReducer';
import { IState } from '../../redux/reducers/rootReducer';
import { PRODUCTS } from '../../service/queries/products';
import withHeader from '../../utils/withHeader';
import withQuery from '../../utils/withQuery';
import Product from './product/Product';

interface Props extends IWithLoading {
  data: {
    category: {
      name: "all";
      products: IProduct[];
    };
  };

  activeCategory: string;
  chosenCurrency: string;

  products: IProduct[];
  setProducts: (products: IProduct[]) => void;

  dialogOpened: boolean;
  modalOpened: boolean;
  chosenProduct: IProduct;
}

class ProductsPage extends PureComponent<Props> {
  componentDidMount() {
    const { setProducts, data, loading } = this.props;

    !loading && setProducts(data.category.products);
  }

  componentDidUpdate(prevProps: Props) {
    const { activeCategory, setProducts } = this.props;
    const { products } = this.props.data.category;

    if (prevProps.activeCategory !== activeCategory) {
      activeCategory === "all"
        ? setProducts(products)
        : setProducts(products.filter((p) => p.category === activeCategory));
    }
  }

  render() {
    const { activeCategory, chosenCurrency, products, dialogOpened } =
      this.props;

    return (
      <div className={`products ${dialogOpened ? "dialog-opened" : ""}`}>
        <h2>
          {activeCategory === "all"
            ? "All Goods"
            : `Category: ${activeCategory}`}
        </h2>

        <div className="products-wrapper">
          {products?.map((product) => (
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

const mapStateToProps = (state: IState) => ({
  activeCategory: state.category.activeCategory,
  chosenCurrency: state.currency.chosenCurrency,
  products: state.products.products,
  dialogOpened: state.dialog.dialogOpened,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProducts: bindActionCreators(productsActions.products.set, dispatch),
});

const ProductsPage_Redux_Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(withHeader(ProductsPage));

export default withQuery(ProductsPage_Redux_Connected, PRODUCTS);
