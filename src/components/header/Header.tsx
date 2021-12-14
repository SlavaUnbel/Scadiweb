import '../../styles/header.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { categoryActions } from '../../redux/reducers/categoryReducer';
import { productDetailsActions } from '../../redux/reducers/productDetailsReucer';
import { IState } from '../../redux/reducers/rootReducer';
import { Icons } from '../../utils/constants';
import BrandIconWrapper from './branIconWrapper/BrandIconWrapper';
import Categories from './categories/Categories';
import HeaderActions from './headerActions/HeaderActions';

interface Props {
  dialogOpened: boolean;
  getAllProducts: () => void;
  setCurrentProduct: (current: IProduct | null) => void;
}

interface State {
  scrolled: boolean;
}

class Header extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleBrandIconClick = this.handleBrandIconClick.bind(this);
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    const { setCurrentProduct } = this.props;
    if (window.location.pathname === "/") setCurrentProduct(null);
    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.setState({ scrolled: window.scrollY >= 80 ? true : false });
  }

  handleBrandIconClick() {
    const { getAllProducts, setCurrentProduct } = this.props;
    window.location.pathname === "/"
      ? getAllProducts()
      : setCurrentProduct(null);
  }

  render() {
    const { dialogOpened } = this.props;
    const { scrolled } = this.state;

    return (
      <header className={scrolled && !dialogOpened ? "darker" : ""}>
        <Categories />

        <BrandIconWrapper>
          <img
            className="brand"
            src={Icons.brand}
            alt=""
            onClick={this.handleBrandIconClick}
            draggable={false}
          />
        </BrandIconWrapper>

        <HeaderActions />
      </header>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  dialogOpened: state.dialog.dialogOpened,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllProducts: bindActionCreators(
    categoryActions.activeCategory.getAll,
    dispatch
  ),
  setCurrentProduct: bindActionCreators(
    productDetailsActions.currentProduct.set,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
