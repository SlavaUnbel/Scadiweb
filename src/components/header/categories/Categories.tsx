import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { categoryActions } from '../../../redux/reducers/categoryReducer';
import { IState } from '../../../redux/reducers/rootReducer';
import { CATEGORIES } from '../../../service/queries/categories';
import withQuery from '../../../utils/withQuery';

interface Props {
  data: {
    categories: Category[];
  };

  activeCategory: string;
  changeCategory: (category: string) => void;
}

class Categories extends PureComponent<Props> {
  render() {
    const { activeCategory, changeCategory } = this.props;
    const path = window.location.pathname;

    return (
      <nav>
        {path === "/" ? (
          this.props.data.categories.map((category) => {
            const name = category.name;

            return (
              <li
                key={name}
                className={activeCategory === name ? "active" : ""}
                onClick={() => changeCategory(name)}
              >
                {name}
              </li>
            );
          })
        ) : (
          <li className="active">
            {path === "/cart" ? "cart" : "product details"}
          </li>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  activeCategory: state.category.activeCategory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCategory: bindActionCreators(
    categoryActions.activeCategory.set,
    dispatch
  ),
});

const Categories_Redux_Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);

export default withQuery(Categories_Redux_Connected, CATEGORIES);
