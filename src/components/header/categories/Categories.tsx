import React, { Component } from 'react';

type CategoriesTypes = "women" | "men" | "kids";

interface State {
  categories: CategoriesTypes[];
  active: CategoriesTypes;
}

export default class Categories extends Component<{}, State> {
  state: Readonly<State> = {
    categories: ["women", "men", "kids"],
    active: "women",
  };

  toggleActive(active: CategoriesTypes) {
    this.setState({ active });
  }

  render() {
    const { categories, active } = this.state;

    return (
      <nav>
        {categories.map((category) => (
          <li
            key={category}
            className={active === category ? "active" : ""}
            onClick={this.toggleActive.bind(this, category)}
          >
            {category}
          </li>
        ))}
      </nav>
    );
  }
}
