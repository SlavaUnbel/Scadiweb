import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query getProducts {
    category {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;
