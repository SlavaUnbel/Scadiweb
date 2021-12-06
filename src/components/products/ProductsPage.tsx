import '../../styles/products.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { categoryActions } from '../../redux/reducers/categoryReducer';
import { productsActions } from '../../redux/reducers/productsReducer';
import { IState } from '../../redux/reducers/rootReducer';
import { PRODUCTS } from '../../service/queries/products';
import withHeader from '../../utils/withHeader';
import withQuery from '../../utils/withQuery';
import Product from './product/Product';

interface Props {
  data: {
    category: {
      name: "all";
      products: IProduct[];
    };
  };
  activeCategory: string;
  chosenCurrency: string;
  changeCategory: (category: string) => void;

  products: IProduct[];
  setProducts: (products: IProduct[]) => void;

  dialogOpened: boolean;
}

class ProductsPage extends PureComponent<Props> {
  componentDidMount() {
    const { changeCategory, setProducts, data } = this.props;

    setProducts(data?.category?.products);
    setTimeout(() => changeCategory("clothes"), 200);
  }

  componentDidUpdate(prevProps: Props) {
    const { activeCategory, setProducts } = this.props;

    if (prevProps.activeCategory !== this.props.activeCategory) {
      activeCategory === "all"
        ? setProducts(this.props.data?.category?.products)
        : setProducts(
            this.props.data?.category?.products.filter(
              (product) => product.category === activeCategory
            )
          );
    }
  }

  render() {
    const { activeCategory, chosenCurrency, products, dialogOpened } =
      this.props;

    return (
      <div className={`products ${dialogOpened ? "dialog-opened" : ""}`}>
        <h2>Category: {activeCategory}</h2>

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
  changeCategory: bindActionCreators(
    categoryActions.activeCategory.set,
    dispatch
  ),
});

const ProductsPage_Redux_Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);

export default withQuery(withHeader(ProductsPage_Redux_Connected), PRODUCTS);
