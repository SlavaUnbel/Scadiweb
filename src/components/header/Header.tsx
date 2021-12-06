import '../../styles/header.scss';

import React, { PureComponent } from 'react';

import { brandIcon } from '../../utils/constants';
import Categories from './categories/Categories';
import HeaderActions from './headerActions/HeaderActions';

interface State {
  scrolled: boolean;
}

export default class Header extends PureComponent<{}, State> {
  constructor(props: {}) {
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

    return (
      <header className={scrolled ? "darker" : ""}>
        <Categories />

        <img className="brand" src={brandIcon} alt="" />

        <HeaderActions />
      </header>
    );
  }
}
