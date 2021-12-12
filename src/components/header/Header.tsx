import '../../styles/header.scss';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { categoryActions } from '../../redux/reducers/categoryReducer';
import { IState } from '../../redux/reducers/rootReducer';
import { Icons } from '../../utils/constants';
import Categories from './categories/Categories';
import HeaderActions from './headerActions/HeaderActions';

interface Props {
  dialogOpened: boolean;
  getAllProducts: () => void;
}

interface State {
  scrolled: boolean;
}

class Header extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      scrolled: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    this.setState({ scrolled: window.scrollY >= 80 ? true : false });
  }

  render() {
    const { scrolled } = this.state;
    const { dialogOpened, getAllProducts } = this.props;

    return (
      <header className={scrolled && !dialogOpened ? "darker" : ""}>
        <Categories />

        <img
          className="brand"
          src={Icons.brand}
          alt=""
          onClick={getAllProducts}
          draggable={false}
        />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
